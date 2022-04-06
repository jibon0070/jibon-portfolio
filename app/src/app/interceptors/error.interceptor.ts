import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {UsersService} from "../services/users.service";
import {Router} from "@angular/router";
import {PlatformLocation} from "@angular/common";
import {Config} from "../helpers/config";
import {environment} from "../../environments/environment";

// import {catchError} from 'rxjs/operators'

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    private readonly usersService: UsersService,
    private readonly router: Router,
    private readonly platformLocation: PlatformLocation
  ) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(catchError((err, _) => {
      if ([401, 403, 500].includes(err.status)  && environment.production) {
        localStorage.removeItem(Config.token);
        sessionStorage.removeItem(Config.token);
        this.usersService.$is_logged.emit(false);
        this.router.navigate(['/users/login'], {queryParams: {path: '/' + this.platformLocation.pathname.replace(this.platformLocation.getBaseHrefFromDOM(), '')}});
      }
      const error = err.error.message || err.stableText;
      return throwError(error);
    }))
  }
}
