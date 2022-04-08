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
    name: new FormControl(null, Validators.required),
    description: new FormControl(null, Validators.required),
    image: new FormControl(null, Validators.required),
  });
  clicked: boolean = false;
  private submitted: Boolean = false;
  loading
    : boolean = false;
  private file!: File;

  constructor(
    private readonly titleService: Title,
    private readonly platformLocation: PlatformLocation,
    private readonly adminService: AdminService,
  ) {
  }

  ngOnInit(): void {
    this.titleService.setTitle('New testimonial');
  }

  onFileChange(event: Event) {
    this.file = (event.target as HTMLInputElement).files!.item(0)!;
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
      formData.append('name', this.data.value.name);
      formData.append('description', this.data.value.description);
      formData.append('image', this.file, this.file.name);
      this.adminService.testimonial.new(formData).subscribe({
        next: res => {
          if (res.success) {
            this.back();
          }
          else {
            this.submitted = false;
            this.loading = false;
            alert(res.error);
          }
        },
        error: err => {
          this.loading = false;
          this.clicked = false;
          this.submitted = false;
          console.log(err);
        }
      })
    }
  }
}
