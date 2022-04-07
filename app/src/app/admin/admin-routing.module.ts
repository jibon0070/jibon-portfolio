import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminComponent} from "./admin.component";
import {AuthGuard} from "../guards/auth.guard";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {environment} from "../../environments/environment";
import {FirstTimeComponent} from "./first-time/first-time.component";
import {HeaderImageComponent} from "./header-image/header-image.component";
import {AboutMeImageComponent} from "./about-me-image/about-me-image.component";
import {SiteOptionsComponent} from "./site-options/site-options.component";
import {ExperienceComponent} from "./experience/experience.component";

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [AuthGuard],
  },
  {
    path:'header-image',
    component: HeaderImageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'about-me-image',
    component: AboutMeImageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'site-options',
    component: SiteOptionsComponent,
    canActivate: [AuthGuard],
  },
  {
    path:'experience',
    loadChildren: () => import('./experience/experience.module').then(m => m.ExperienceModule),
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
