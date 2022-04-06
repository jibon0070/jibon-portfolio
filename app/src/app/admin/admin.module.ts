import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import {MatCardModule} from "@angular/material/card";
import {ReactiveFormsModule} from "@angular/forms";
import {CommonsModule} from "../commons/commons.module";
import {MatButtonModule} from "@angular/material/button";
import { FirstTimeComponent } from './first-time/first-time.component';


@NgModule({
  declarations: [
    AdminComponent,
    RegisterComponent,
    LoginComponent,
    FirstTimeComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatCardModule,
    ReactiveFormsModule,
    CommonsModule,
    MatButtonModule
  ]
})
export class AdminModule { }
