import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private url: string = environment.api + '/admin';
  siteOptions = {
    index: () => this.http.get<{ id: string, name: string, value: string }[]>(this.url + '/site-options'),

    new: (name: string, value: string) => this.http.post<{ success: boolean; error: string }>(this.url + '/site-options/new', {
      name,
      value
    }),

    delete: (id: string) => this.http.post<{ success: boolean; error: string }>(this.url + '/site-options/delete/', {id}),
  }
  experience = {
    new: (data: any) => this.http.post<{ success: boolean, error: string }>(this.url + '/experience/new', data),
    index: ()=> this.http.get<{ id: string, title: string, experience: string; category: string }[]>(this.url + '/experience'),
    delete: (id: string) => this.http.post<{ success: boolean; error: string }>(this.url + '/experience/delete/', {id}),
  }
  portfolio = {
    new: (data:any) => this.http.post<{ success: boolean, error: string }>(this.url + '/portfolio/new', data),
  }

  constructor(
    private readonly http: HttpClient,
  ) {
  }

  headerImage(formData: FormData) {
    return this.http.post<{
      success?: boolean,
      url?: string,
    }>(this.url + '/header-image', formData);
  }

  aboutMeImage(formData: FormData) {
    return this.http.post<{
      success?: boolean,
      url?: string,
    }>(this.url + '/about-me-image', formData);
  }
}
