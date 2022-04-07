import {Component, OnInit} from '@angular/core';
import {Title} from "@angular/platform-browser";
import {PlatformLocation} from "@angular/common";
import {AdminService} from "../../services/admin.service";
import {environment} from "../../../environments/environment";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-about-me-image',
  templateUrl: './about-me-image.component.html',
  styleUrls: ['./about-me-image.component.scss']
})
export class AboutMeImageComponent implements OnInit {
  loading: boolean = true;
  url!: string;
  data: FormGroup = new FormGroup({
    image: new FormControl(null, Validators.required)
  });

  constructor(
    private readonly title: Title,
    private readonly platformLocation: PlatformLocation,
    private readonly adminService: AdminService
  ) {
  }

  ngOnInit(): void {
    this.title.setTitle('About Me Image');
    const formData = new FormData();
    formData.append('state', 'get');
    this.adminService.aboutMeImage(formData).subscribe({
      next: (res) => {
        if (res.url)
          this.url = environment.api + res.url;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    })
  }

  back() {
    this.platformLocation.back();
  }

  change_file(e: Event) {
    const file = (e.target as HTMLInputElement).files?.item(0);
    const formData = new FormData();
    if (file) {
      formData.append('image', file, file.name);
    }
    formData.append('state', 'set');
    this.loading = true;
    this.adminService.aboutMeImage(formData).subscribe({
      next: (res) => {
        if(res.success) this.back();
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    })
  }
}
