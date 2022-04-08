import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class TestimonialService {
  private url: string = environment.api + '/testimonial';
  get index(){
    return this.http.get<{
      name: string,
      description: string,
      image_link: string,
    }[]>(this.url);
  }

  constructor(
    private readonly http: HttpClient
  ) { }
}
