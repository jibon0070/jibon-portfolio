import {Component, OnInit} from '@angular/core';
import {Title} from "@angular/platform-browser";
import {PlatformLocation} from "@angular/common";
import {AdminService} from "../../services/admin.service";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit {
  loading: boolean = true;
  portfolios: { id: string; title: string; github_link: string; live_link: string; image_link: string }[] = [];
  api = environment.api;

  constructor(
    private readonly titleService: Title,
    private readonly platformLocation: PlatformLocation,
    private readonly adminService: AdminService
  ) {
  }

  ngOnInit(): void {
    this.titleService.setTitle('Portfolio');
    this.fetch();
  }

  private fetch() {
    this.adminService.portfolio.index().subscribe({
      next: (res) => {
        this.portfolios = res;
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

  delete(id: string) {
    if (confirm('Are you sure you want to delete this portfolio?')) {
      this.loading = true;
      this.adminService.portfolio.delete(id).subscribe({
        next: (res) => {
          if (res.success) {
            this.fetch();
          }else {
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
