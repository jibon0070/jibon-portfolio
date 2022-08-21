import { PlatformLocation } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  loading: boolean = true;
  contacts: { id: string; name: string; email: string; message: string; }[] = [];

  constructor(
    private readonly titleService: Title,
    private readonly adminService: AdminService,
    private readonly platformLocation: PlatformLocation
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle('Contact');
    this.adminService.contact.index().subscribe({
      next: (contacts) => {
        this.contacts = contacts;
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        console.error(err);
        
      }
    })
  }

  back() {
    this.platformLocation.back();
  }

  delete(id: string) {
    if(confirm('Are you sure you want to delete this message?')) {
      this.loading = true;
      this.adminService.contact.delete(id).subscribe({
        next: (res) => {
          if(res.success) {
            this.contacts = this.contacts.filter(contact => contact.id !== id);
            this.loading = false;
          }else if(res.error) {
            this.loading = false;
            alert(res.error);
          }
        },
        error: (err) => {
          this.loading = false;
          console.error(err);
        }
      });
    }
  }

}
