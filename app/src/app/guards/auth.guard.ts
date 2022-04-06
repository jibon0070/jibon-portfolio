import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {UsersService} from "../services/users.service";
import {PlatformLocation} from "@angular/common";
import {Config} from "../helpers/config";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private readonly usersService: UsersService,
    private readonly router: Router,
    private readonly platformLocation: PlatformLocation
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let allowed: string[] | null = route.data["allowed"] ?? null;
    //allowed is mentioned
    if (allowed) {
      //mentioned visitor
      if (allowed.includes('visitor')) {
        //role is visitor
        if (this.usersService.role == 'visitor') {
          //passed
          return true;
        }
        //role is not visitor
        else {
          //send him home
          this.router.navigate(['/']);
        }
      }
      //not mentioned visitor
      else {
        //role is visitor
        if (this.usersService.role == 'visitor') {
          //send him to the gate with path
          this.router.navigate([Config.auth_guard_redirect_path], {queryParams: {path: '/' + this.platformLocation.pathname.replace(this.platformLocation.getBaseHrefFromDOM(), '')}})
        }
        //role is not visitor
        else {
          //role is mentioned
          if (allowed.includes(this.usersService.role)) {
            // passed
            return true;
          }
          //role is not mentioned
          else {
            //send him to home
            this.router.navigate(['/']);
          }
        }
      }
    }
    //allowed is not mentioned
    else {
      //not visitor
      if (this.usersService.role !== 'visitor') {
        //passed
        return true;
      }
      //visitor
      else {
        //send him to the gate with path
        this.router.navigate([Config.auth_guard_redirect_path], {queryParams: {path: '/' + this.platformLocation.pathname.replace(this.platformLocation.getBaseHrefFromDOM(), '')}})
      }
    }
    return true;
  }

}
