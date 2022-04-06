import {Component, OnInit} from '@angular/core';
import {Title} from "@angular/platform-browser";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UsersService} from "../../services/users.service";

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
  private submitted: Boolean = false;
  loading: boolean = false;

  constructor(
    private readonly titleService: Title,
    private readonly formBuilder: FormBuilder,
    private readonly userService: UsersService,
  ) {
  }

  ngOnInit(): void {
    this.titleService.setTitle('Login');
  }

  submit() {
    this.clicked = true;
    if (this.data.valid && !this.submitted) {
      this.submitted = true;
      this.loading = true;
      this.userService.login(this.data.value).subscribe({
        next: (res) => {
          if (res.error){
            if (res.error == 'username'){
              this.data.get('username')?.setErrors({'username': 'Invalid username or email.'});
            } else if (res.error == 'password'){
              this.data.get('password')?.setErrors({'password': 'Invalid password.'});
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
}
