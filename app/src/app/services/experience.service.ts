import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ExperienceService {
  private url: string = environment.api + '/experience';
  get index(){
    return this.http.get<{
      frontend: {
        title: string,
        experience: string,
      }[],
      backend: {
        title: string,
        experience: string,
      }[],
    }>(this.url);
  }

  constructor(
    private readonly http: HttpClient,
  ) { }
}
