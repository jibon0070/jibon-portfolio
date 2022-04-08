import { Component, OnInit } from '@angular/core';
import {Title} from "@angular/platform-browser";
import {PlatformLocation} from "@angular/common";
import {AdminService} from "../../services/admin.service";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.scss']
})
export class TestimonialsComponent implements OnInit {
  loading: boolean = true;
  testimonials: { id: string; name: string; description: string; image_link: string }[] = [];
  api: string = environment.api;

  constructor(
    private readonly titleService: Title,
    private readonly platformLocation: PlatformLocation,
    private readonly adminService: AdminService
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle('Testimonials');
    this.fetch();
  }

  private fetch() {
    this.adminService.testimonial.index().subscribe({
      next: (data) => {
        this.testimonials = data;
        this.loading = false;
      },
      error: (err) => {
        console.log(err);
        this.loading = false;
      }
    });
  }

  back() {
    this.platformLocation.back();
  }

  delete(id: string) {
    if (confirm('Are you sure you want to delete this testimonial?')) {
      this.loading = true;
      this.adminService.testimonial.delete(id).subscribe({
        next: (data) => {
          if (data.success) {
            this.fetch();
          }else {
            alert(data.error);
            this.loading = false;
          }
        },
        error: (err) => {
          console.log(err);
          this.loading = false;
        }
      });
    }
  }
}
