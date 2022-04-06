import { Component, OnInit } from '@angular/core';
import {Title} from "@angular/platform-browser";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  data: FormGroup = this.formBuilder.group({
    email: ['', Validators.required],
  });
  clicked: boolean = false;

  constructor(
    private readonly titleService: Title,
    private readonly formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle('Register');
  }

  submit() {
    console.log(this.data.value);
  }
}
