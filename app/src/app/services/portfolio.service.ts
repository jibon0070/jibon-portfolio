import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  private url: string = environment.api + '/portfolio';
  get index() {
    return this.http.get<{
      title: string,
      github_link: string,
      live_link: string,
      image_link: string,
    }[]>(this.url);
  }

  constructor(
    private readonly http: HttpClient
  ) { }
}
