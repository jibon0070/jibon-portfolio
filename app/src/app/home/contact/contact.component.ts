import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { CustomValidator } from "../../helpers/CustomValidator";
import { ContactService } from "../../services/contact.service";

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
          if (res.error) {
            alert(res.error);
          } else if (res.success) {
            alert("Message sent successfully");
          }else if(res.url){
            alert("Message sent successfully");
          }
          this.data.reset();
          this.submitted = false;
          this.loading = false;
        },
        error: (err) => {
          this.submitted = false;
          this.loading = false;
          console.log(err);
        }
      });
    }
    else {
      if (this.data.get('name')?.invalid) {
        alert("Name is required");
      } else if (this.data.get('email')?.invalid) {
        if (this.data.get('email')?.getError('email')) {
          alert("Email is invalid");
        } else {
          alert("Email is required");
        }
      } else if (this.data.get('message')?.invalid) {
        alert("Message is required");
      }
    }
  }
}
