import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExperienceRoutingModule } from './experience-routing.module';
import {ExperienceComponent} from "./experience.component";
import {MatButtonModule} from "@angular/material/button";
import { NewComponent } from './new/new.component';
import {MatCardModule} from "@angular/material/card";
import {ReactiveFormsModule} from "@angular/forms";
import {CommonsModule} from "../../commons/commons.module";


@NgModule({
  declarations: [
    ExperienceComponent,
    NewComponent
  ],
  imports: [
    CommonModule,
    ExperienceRoutingModule,
    MatButtonModule,
    MatCardModule,
    ReactiveFormsModule,
    CommonsModule
  ]
})
export class ExperienceModule { }
