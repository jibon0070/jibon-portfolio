import { Component, OnInit } from '@angular/core';
import {Title} from "@angular/platform-browser";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CustomValidator} from "../../helpers/CustomValidator";
import {UsersService} from "../../services/users.service";
import {AsyncValidator} from "../../helpers/AsyncValidator";
import {environment} from "../../../environments/environment";
import {PlatformLocation} from "@angular/common";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  data: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, CustomValidator.email], AsyncValidator.uniq(environment.api + '/users/uniq', 'email', 'Email already registered.')],
  });
  clicked: boolean = false;
  private submitted: Boolean = false;
  loading: boolean = false;

  constructor(
    private readonly titleService: Title,
    private readonly formBuilder: FormBuilder,
    private readonly usersService: UsersService,
    private readonly platformLocation: PlatformLocation
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle('Register');
  }

  submit() {
    this.clicked = true;
    if (this.data.valid && !this.submitted) {
      this.submitted = true;
      this.loading = true;
      this.usersService.register(this.data.value).subscribe({
        next: (r) => {
          if (r.success)this.back();
        },
        error: (e) => {
          console.error(e);
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
