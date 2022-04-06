import {EventEmitter, Injectable} from '@angular/core';
import {Config} from "../helpers/config";
import jwtDecode from "jwt-decode";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private url: string = environment.api + '/users';

  get index() {
    return this.httpClient.get<{
      id: string;
      username: string;
      name: string;
      email: string;
      phone: string;
      role: string;
      status: string;
    }[]>(this.url);
  }

  constructor(
    private readonly httpClient: HttpClient
  ) {
  }

  $is_logged = new EventEmitter<boolean>();

  get token(): string | null {
    return localStorage.getItem(Config.token) || sessionStorage.getItem(Config.token);
  }

  get is_logged(): boolean {
    return !!this.token;
  }

  get role(): string {
    if (!this.is_logged) return 'visitor';
    try {
      let payload = jwtDecode<{ id: string; role: string; }>(this.token!);
      return payload.role;
    } catch {
      return 'visitor';
    }
  }

  loginWithGoogle(token: string) {
    return this.httpClient.post<{
      first_time: string;
      token?: string;
    }>(this.url + 'login-with-google', {token});
  }

  firstTime(param: { data?: any; state: string }) {
    return this.httpClient.post<{
      success: boolean;
      profile_picture: string;
      name: string;
      email: string;
    }>(this.url + 'first-time', param);
  }

  login(value: any) {
    return this.httpClient.post<{
      token?: string;
      error?: string;
    }>(this.url + '/login', value);
  }

  loginAs(id: string) {
    return this.httpClient.post<{ token: string;}>(this.url + 'login-as', {id});
  }
}
