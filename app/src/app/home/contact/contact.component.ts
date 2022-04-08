import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CustomValidator} from "../../helpers/CustomValidator";
import {ContactService} from "../../services/contact.service";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  data: FormGroup = new FormGroup({
    name: new FormControl(null, Validators.required),
    email: new FormControl(null, [Validators.required, CustomValidator.email]),
    message: new FormControl(null, Validators.required)
  });
  private submitted: Boolean = false;
  loading: boolean = false;

  constructor(
    private readonly contactService: ContactService
  ) { }

  ngOnInit(): void {
  }

  submit() {
    if (this.data.valid && !this.submitted) {
      this.submitted = true;
      this.loading = true;
      this.contactService.send(this.data.value).subscribe({
        next: (res) => {
          this.submitted = false;
          this.loading = false;
          console.log(res);
        },
        error: (err) => {
          this.submitted = false;
          this.loading = false;
          console.log(err);
        }
      });
    }
  }
}
