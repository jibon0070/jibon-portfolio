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
    this.setActiveNavigation();
    addEventListener('scroll', () => {
      this.setActiveNavigation();
    });
  }

  private setActiveNavigation() {
    const header = document.querySelector<HTMLDivElement>('header')!;
    const about = document.querySelector<HTMLDivElement>('#about')!;
    const experience = document.querySelector<HTMLDivElement>('#experience')!;
    // const services = document.querySelector<HTMLDivElement>('#services')!;
    const contact = document.querySelector<HTMLDivElement>('#contact')!;
    const portfolio = document.querySelector<HTMLDivElement>('#portfolio')!;
    const testimonials = document.querySelector<HTMLDivElement>('#testimonials')!;
    if (header.getBoundingClientRect().top >= 0 && header.getBoundingClientRect().top <= innerHeight) {
      this.active = '';
    }
    else if (about.getBoundingClientRect().top >= 0 && about.getBoundingClientRect().top <= innerHeight) {
      this.active = 'about';
    }
    else if (experience.getBoundingClientRect().top >= 0 && experience.getBoundingClientRect().top <= innerHeight) {
      this.active = 'experience';
    }/* else if (services.getBoundingClientRect().top >= 0 && services.getBoundingClientRect().top <= innerHeight) {
        this.active = 'services';
      }*/ else if (contact.getBoundingClientRect().top >= 0 && contact.getBoundingClientRect().top <= innerHeight) {
      this.active = 'contact';
    }
    else if (portfolio.getBoundingClientRect().top >= 0 && portfolio.getBoundingClientRect().top <= innerHeight) {
      this.active = 'portfolio';
    }
    else if (testimonials.getBoundingClientRect().top >= 0 && testimonials.getBoundingClientRect().top <= innerHeight) {
      this.active = 'testimonials';
    }
  }
}
