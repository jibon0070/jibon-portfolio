import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import {HeaderComponent} from "./header/header.component";
import {NavComponent} from "./nav/nav.component";
import {AboutComponent} from "./about/about.component";
import {ExperienceComponent} from "./experience/experience.component";
import {PortfolioComponent} from "./portfolio/portfolio.component";
import {TestimonialsComponent} from "./testimonials/testimonials.component";
import {ContactComponent} from "./contact/contact.component";
import {FooterComponent} from "./footer/footer.component";
import {MatIconModule} from "@angular/material/icon";
import {SwiperModule} from "swiper/angular";
import {CommonsModule} from "../commons/commons.module";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    NavComponent,
    AboutComponent,
    ExperienceComponent,
    PortfolioComponent,
    TestimonialsComponent,
    ContactComponent,
    FooterComponent
  ],
	imports: [
		CommonModule,
		HomeRoutingModule,
		MatIconModule,
		SwiperModule,
		CommonsModule,
		ReactiveFormsModule
	]
})
export class HomeModule { }
