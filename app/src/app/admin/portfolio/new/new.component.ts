import {Component, OnInit} from '@angular/core';
import {Title} from "@angular/platform-browser";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {PlatformLocation} from "@angular/common";
import {AdminService} from "../../../services/admin.service";

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {
  data: FormGroup = new FormGroup({
    title: new FormControl(null, Validators.required),
    github_link: new FormControl(null),
    live_link: new FormControl(null),
    image: new FormControl(null, Validators.required),
  });
  clicked: boolean = false;
  private file!: File;
  private submitted: Boolean = false;
  loading: boolean = false;

  constructor(
    private readonly titleService: Title,
    private readonly platformLocation: PlatformLocation,
    private readonly adminService: AdminService,
  ) {
  }

  ngOnInit(): void {
    this.titleService.setTitle('New portfolio');
  }

  change_file(event: Event) {
    this.file = (<HTMLInputElement>event.target).files!.item(0)!;
  }

  back() {
    this.platformLocation.back();
  }

  submit() {
    this.clicked = true;
    if (this.data.valid && !this.submitted) {
      this.submitted = true;
      this.loading = true;
      let formData = new FormData();
      formData.append('title', this.data.value.title);
      formData.append('github_link', this.data.value.github_link);
      formData.append('live_link', this.data.value.live_link);
      formData.append('image', this.file, this.file.name);
      this.adminService.portfolio.new(formData).subscribe({
        next: r => {
          console.log(r);
          this.loading = false;
          this.submitted = false;
        },
        error: e => {
          console.log(e);
          this.loading = false;
          this.submitted = false;
        }
      })
    }
  }
}
