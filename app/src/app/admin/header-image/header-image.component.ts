import {Component, OnInit} from '@angular/core';
import {Title} from "@angular/platform-browser";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AdminService} from "../../services/admin.service";
import {PlatformLocation} from "@angular/common";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-header-image',
  templateUrl: './header-image.component.html',
  styleUrls: ['./header-image.component.scss']
})
export class HeaderImageComponent implements OnInit {
  data: FormGroup = new FormGroup({
    image: new FormControl(null, [Validators.required]),
  });
  private submitted: Boolean = false;
  loading: boolean = true;
  url: string = '';
  api: string = environment.api;

  constructor(
    private readonly title: Title,
    private readonly adminService: AdminService,
    private readonly platformLocation: PlatformLocation
  ) {
  }

  ngOnInit(): void {
    this.title.setTitle('Header Image');
    const formData = new FormData();
    formData.append('state', 'get');
    this.adminService.headerImage(formData).subscribe({
      next: (res) => {
        this.url = res.url!;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }


  change_file(event: Event) {
    const file = (<HTMLInputElement>event.target).files?.item(0);
    const formData = new FormData();
    if (file) {
      formData.append('image', file, file.name);
    }
    formData.append('state', 'set')
    if (this.data.valid && !this.submitted) {
      this.submitted = true;
      this.loading = true;
      this.adminService.headerImage(formData).subscribe({
        next: (res) => {
          if (res.success) {
            this.back();
          }else{
            this.submitted = false;
            this.loading = false;
            console.log(res);
          }
        },
        error: (err) => {
          console.log(err);
          this.loading = false;
          this.submitted = false;
        }
      });
    }
  }

  back() {
    this.platformLocation.back();
  }
}
