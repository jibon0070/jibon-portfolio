import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TestimonialsRoutingModule } from './testimonials-routing.module';
import { TestimonialsComponent } from './testimonials.component';
import { NewComponent } from './new/new.component';
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {ReactiveFormsModule} from "@angular/forms";
import {CommonsModule} from "../../commons/commons.module";
import {MatIconModule} from "@angular/material/icon";


@NgModule({
  declarations: [
    TestimonialsComponent,
    NewComponent
  ],
	imports: [
		CommonModule,
		TestimonialsRoutingModule,
		MatButtonModule,
		MatCardModule,
		ReactiveFormsModule,
		CommonsModule,
		MatIconModule
	]
})
export class TestimonialsModule { }
