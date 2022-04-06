import {Component, OnInit} from '@angular/core';
import {Title} from "@angular/platform-browser";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CustomValidator} from "../../helpers/CustomValidator";
import {AsyncValidator} from "../../helpers/AsyncValidator";
import {environment} from "../../../environments/environment";
import {UsersService} from "../../services/users.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-first-time',
  templateUrl: './first-time.component.html',
  styleUrls: ['./first-time.component.scss']
})
export class FirstTimeComponent implements OnInit {
  clicked = false;
  data: FormGroup = this.formBuilder.group({
    username: ['', [Validators.required, CustomValidator.username], AsyncValidator.uniq(environment.api + '/users/uniq', 'username', 'Username already registered.')],
    email: [{value: null, disabled: true}],
    password: [null, [Validators.required, CustomValidator.password(8, 50)]],
  });
  private submitted: Boolean = false;
  loading: boolean = true;
  password_type: "text" | "password" = "password";
  password_icon: 'lock' | 'lock_open' = 'lock';
  private show_password: boolean = false;
  private path!: string;

  constructor(
    private readonly title: Title,
    private readonly formBuilder: FormBuilder,
    private readonly usersService: UsersService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router
  ) {
  }

  ngOnInit(): void {
    this.title.setTitle('Initial Data');
    this.activatedRoute.queryParams.subscribe(params => {
      this.path = params['path'];
      this.usersService.firstTime({state: 'get'}).subscribe({
        next: (data) => {
          this.data.patchValue(data);
          this.loading = false;
        },
        error: (err) => {
          console.log(err);
          this.loading = false;
        }
      });
    });
  }

  submit() {
    this.clicked = true;
    if (this.data.valid && !this.submitted) {
      this.submitted = true;
      this.loading = true;
      this.usersService.firstTime({state: 'set', data: this.data.value}).subscribe({
        next: (data) => {
          if (data.success) {
            if (this.path) {
              this.router.navigate(['/' + this.path]);
            }
            else {
              this.router.navigate(['/admin']);
            }
          }
        },
        error: (err) => {
          this.loading = false;
          this.submitted = false;
          console.log(err);
        }
      });
    }
  }

  toggle_password() {
    this.show_password = !this.show_password;
    if (this.show_password) {
      this.password_type = 'text';
      this.password_icon = 'lock_open';
    }
    else {
      this.password_type = 'password';
      this.password_icon = 'lock';
    }
  }
}
