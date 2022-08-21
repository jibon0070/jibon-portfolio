import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import SwiperCore, { Navigation } from "swiper";
import {TestimonialService} from "../../services/testimonial.service";
import {environment} from "../../../environments/environment";
SwiperCore.use([Navigation]);
@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TestimonialsComponent implements OnInit {
  private loading: boolean = true;
  testimonials: { name: string; description: string; image_link: string }[] = [];
  api: string = environment.api;

  constructor(
    private readonly testimonialService: TestimonialService
  ) { }

  ngOnInit(): void {
    this.testimonialService.index.subscribe({
      next: (testimonials) => {
        this.testimonials = testimonials;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }

}
