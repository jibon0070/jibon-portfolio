import { Component, OnInit } from '@angular/core';
import {Title} from "@angular/platform-browser";
import {Helpers} from "../../../helpers/Helpers";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AsyncValidator} from "../../../helpers/AsyncValidator";
import {environment} from "../../../../environments/environment";
import {AdminService} from "../../../services/admin.service";
import {PlatformLocation} from "@angular/common";

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {
  category_opts: { account: string; value: string; }[] = ['frontend', 'backend'].map(x => ({ account: Helpers.titlecase(x), value: x }));
  clicked: boolean = false;
  data: FormGroup = new FormGroup({
    title: new FormControl('', Validators.required, AsyncValidator.uniq(environment.api + '/experience/uniq', 'title', 'Title already exists')),
    experience: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
  });
  private submitted: Boolean = false;
  loading: boolean = false;

  constructor(
    private readonly title: Title,
    private readonly adminService:AdminService,
    private readonly platformLocation: PlatformLocation
  ) { }

  ngOnInit(): void {
    this.title.setTitle('New Experience');
  }

  submit() {
    this.clicked = true;
    if (this.data.valid && !this.submitted) {
      this.submitted = true;
      this.loading = true;
      this.adminService.experience.new(this.data.value).subscribe({
        next: (res) => {
          if (res.error) {
            alert(res.error);
            this.submitted = false;
            this.loading = false;
          } else if (res.success) {
            this.platformLocation.back();
          }
        },
        error: (err) => {
          this.loading = false;
          this.submitted = false;
          console.error(err);
        }
      });
    }
  }

  back() {
    this.platformLocation.back();
  }
}
