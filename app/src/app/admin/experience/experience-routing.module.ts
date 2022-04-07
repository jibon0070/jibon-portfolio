import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ExperienceComponent} from "./experience.component";
import {AuthGuard} from "../../guards/auth.guard";
import {NewComponent} from "./new/new.component";

const routes: Routes = [
  {
    path: '',
    component: ExperienceComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'new',
    component: NewComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExperienceRoutingModule { }
