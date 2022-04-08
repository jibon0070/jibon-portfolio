import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private url: string = environment.api + '/contact';

  constructor(
    private readonly http: HttpClient,
  ) { }

  send(value: any) {
    return this.http.post<{ success: boolean, error: string, }>(this.url + '/send', value);
  }
}
