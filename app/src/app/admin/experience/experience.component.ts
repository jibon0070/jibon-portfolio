import { Component, OnInit } from '@angular/core';
import {Title} from "@angular/platform-browser";
import {AdminService} from "../../services/admin.service";
import {PlatformLocation} from "@angular/common";

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss']
})
export class ExperienceComponent implements OnInit {
  loading = true;
  experiences: { id: string; title: string; experience: string; category: string }[] = [];

  constructor(
    private readonly title: Title,
    private readonly adminService: AdminService,
    private readonly platformLocation: PlatformLocation
  ) { }

  ngOnInit(): void {
    this.title.setTitle('Experience');
    this.fetch();
  }

  private fetch() {
    this.adminService.experience.index().subscribe({
      next: (experiences) => {
        this.experiences = experiences;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  delete(id: string) {
    if (confirm('Are you sure you want to delete this experience?')) {
      this.loading = true;
      this.adminService.experience.delete(id).subscribe({
        next: (res) => {
          if (res.success) {
            this.fetch();
          }else{
            alert(res.error);
            this.loading = false;
          }
        },
        error: (err) => {
          console.error(err);
          this.loading = false;
        }
      });
    }
  }

  back() {
    this.platformLocation.back();
  }
}
