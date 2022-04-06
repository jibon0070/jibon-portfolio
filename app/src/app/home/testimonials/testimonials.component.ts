import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import SwiperCore, { Navigation } from "swiper";
SwiperCore.use([Navigation]);
@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TestimonialsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
