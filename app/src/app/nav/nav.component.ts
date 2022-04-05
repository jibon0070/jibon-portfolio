import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  constructor() { }

  active = '';

  ngOnInit(): void {
    addEventListener('scroll', (e) => {
      const header = document.querySelector<HTMLDivElement>('header')!;
      const about = document.querySelector<HTMLDivElement>('#about')!;
      const experience = document.querySelector<HTMLDivElement>('#experience')!;
      // const services = document.querySelector<HTMLDivElement>('#services')!;
      const contact = document.querySelector<HTMLDivElement>('#contact')!;
      if (header.getBoundingClientRect().top >= 0 && header.getBoundingClientRect().top <= innerHeight) {
        this.active = '';
      } else if (about.getBoundingClientRect().top >= 0 && about.getBoundingClientRect().top <= innerHeight) {
        this.active = 'about';
      } else if (experience.getBoundingClientRect().top >= 0 && experience.getBoundingClientRect().top <= innerHeight) {
        this.active = 'experience';
      }/* else if (services.getBoundingClientRect().top >= 0 && services.getBoundingClientRect().top <= innerHeight) {
        this.active = 'services';
      }*/ else if (contact.getBoundingClientRect().top >= 0 && contact.getBoundingClientRect().top <= innerHeight) {
        this.active = 'contact';
      }
    });
  }

}
