import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private url: string = environment.api + '/home';
  get getHomeData(){
    return this.http.get<{
      header_image: string,
      about_me_image: string,
      experience: string,
      clients: string,
      projects: string,
    }>(this.url);
  }

  constructor(
    private readonly http: HttpClient
  ) { }
}
