import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Title} from "@angular/platform-browser";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UsersService} from "../../services/users.service";
import {GoogleLoginProvider, SocialAuthService} from "angularx-social-login";
import {Helpers} from "../../helpers/Helpers";
import {ActivatedRoute, Router} from "@angular/router";
import {FormGroupComponent} from "../../commons/form-group/form-group.component";
import {Config} from "../../helpers/config";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  clicked: any;
  data: FormGroup = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });
  @ViewChild('username') username!: ElementRef<FormGroupComponent>;
  private submitted: Boolean = false;
  loading: boolean = false;
  disable_login_with_google_button: boolean = false;
  private path!: string;

  constructor(
    private readonly titleService: Title,
    private readonly formBuilder: FormBuilder,
    private readonly userService: UsersService,
    private readonly socialAuthService: SocialAuthService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router
  ) {
  }

  ngOnInit(): void {
    this.titleService.setTitle('Login');
    this.activatedRoute.queryParams.subscribe(params => {
      this.path = params['path'];
      Helpers.google_login_listener(this.socialAuthService, this.userService, (r) => {
        if (r.error) {
          this.disable_login_with_google_button = false;
          this.loading = false;
          alert('Invalid Email');
        } else {
          localStorage.setItem(Config.token, r.token);
          if (r.first_time == 0) {
            if (this.path) {
              this.router.navigate(['/admin'], {queryParams: {path: this.path}});
            } else {
              this.router.navigate(['/admin']);
            }
          } else {
            if (this.path) {
              this.router.navigate(['/admin/first-time'], {queryParams: {path: this.path}});
            } else {
              this.router.navigate(['/admin/first-time']);
            }
          }
        }
      });
    });
  }

  submit() {
    this.clicked = true;
    if (this.data.valid && !this.submitted) {
      this.submitted = true;
      this.loading = true;
      this.userService.login(this.data.value).subscribe({
        next: (res) => {
          if (res.error) {
            if (res.error == 'username') {
              this.data.get('username')?.setErrors({'username': 'Invalid username or email.'});
            } else if (res.error == 'password') {
              this.data.get('password')?.setErrors({'password': 'Invalid password.'});
            } else if (res.error == 'first_time') {
              this.data.get('username')?.setErrors({'username': 'Email not verified.'});
            }
          }
          console.log(res);
          this.loading = false;
          this.submitted = false;
        },
        error: (err) => {
          console.log(err);
          this.loading = false;
          this.submitted = false;
        }
      });
    }
  }

  login_with_google() {
    this.disable_login_with_google_button = true;
    this.loading = true
    Helpers.login_with_google_popup(this.socialAuthService, () => {
      this.loading = false;
      this.disable_login_with_google_button = false;
    });
  }
}
