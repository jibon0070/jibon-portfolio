import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UsersService} from "../services/users.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private readonly usersService: UsersService
  ) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (!this.usersService.is_logged)
      return next.handle(request);
    const httpRequest = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.usersService.token}`
      }
    });
    return next.handle(httpRequest);
  }
}
