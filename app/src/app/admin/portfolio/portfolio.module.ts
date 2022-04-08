import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PortfolioRoutingModule } from './portfolio-routing.module';
import {PortfolioComponent} from "./portfolio.component";
import {MatButtonModule} from "@angular/material/button";
import { NewComponent } from './new/new.component';
import {MatCardModule} from "@angular/material/card";
import {ReactiveFormsModule} from "@angular/forms";
import {CommonsModule} from "../../commons/commons.module";


@NgModule({
  declarations: [
    PortfolioComponent,
    NewComponent
  ],
  imports: [
    CommonModule,
    PortfolioRoutingModule,
    MatButtonModule,
    MatCardModule,
    ReactiveFormsModule,
    CommonsModule
  ]
})
export class PortfolioModule { }
