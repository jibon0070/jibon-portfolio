import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminComponent} from "./admin.component";
import {AuthGuard} from "../guards/auth.guard";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {environment} from "../../environments/environment";
import {FirstTimeComponent} from "./first-time/first-time.component";

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthGuard],
    data: {
      allowed: ['visitor']
    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: environment.production ? [AuthGuard] : [],
  },
  {
    path: 'first-time',
    component: FirstTimeComponent,
    canActivate: [AuthGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
