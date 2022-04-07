import { Component, OnInit } from '@angular/core';
import {Title} from "@angular/platform-browser";
import {AdminService} from "../../services/admin.service";
import {PlatformLocation} from "@angular/common";

@Component({
  selector: 'app-site-options',
  templateUrl: './site-options.component.html',
  styleUrls: ['./site-options.component.scss']
})
export class SiteOptionsComponent implements OnInit {
  options: { id: string; name: string; value: string }[] = [];
  loading: boolean = true;

  constructor(
    private readonly title:Title,
    private readonly adminService:AdminService,
    private readonly platformLocation: PlatformLocation
  ) { }

  ngOnInit(): void {
    this.title.setTitle('Site Options');
    this.fetch();
  }

  private fetch() {
    this.adminService.siteOptions.index().subscribe({
      next: (options) => {
        this.options = options;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }

  back() {
    this.platformLocation.back();
  }

  new() {
    const name = prompt('Option Name');
    const value = prompt('Option Value');
    if (name && value) {
      this.loading = true;
      this.adminService.siteOptions.new(name, value).subscribe({
        next: (res) => {
          if (res.success){
            this.fetch();
          }else if (res.error){
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

  delete(id: string) {
    if (confirm('Are you sure you want to delete this option?')) {
      this.loading = true;
      this.adminService.siteOptions.delete(id).subscribe({
        next: (res) => {
          if (res.success){
            this.fetch();
          }else if (res.error){
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
}
