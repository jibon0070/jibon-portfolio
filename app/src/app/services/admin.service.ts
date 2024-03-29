import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";

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

    delete: (id: string) => this.http.post<{ success: boolean; error: string }>(this.url + '/site-options/delete/', { id }),
  }
  experience = {
    new: (data: any) => this.http.post<{ success: boolean, error: string }>(this.url + '/experience/new', data),
    index: () => this.http.get<{ id: string, title: string, experience: string; category: string }[]>(this.url + '/experience'),
    delete: (id: string) => this.http.post<{ success: boolean; error: string }>(this.url + '/experience/delete/', { id }),
  }
  portfolio = {
    new: (data: any) => this.http.post<{ success: boolean, error: string }>(this.url + '/portfolio/new', data),
    index: () => this.http.get<{ id: string, title: string, github_link: string; live_link: string; image_link: string; }[]>(this.url + '/portfolio'),
    delete: (id: string) => this.http.post<{ success: boolean; error: string }>(this.url + '/portfolio/delete/', { id }),
  }
  testimonial = {
    new: (data: FormData) => this.http.post<{ success: boolean, error: string }>(this.url + '/testimonial/new', data),
    index: () => this.http.get<{ id: string, name: string, description: string; image_link: string; }[]>(this.url + '/testimonial'),
    delete: (id: string) => this.http.post<{ success: boolean; error: string }>(this.url + '/testimonial/delete/', { id }),
  }
  contact = {
    index: () => this.http.get<{ id: string, name: string, email: string; message: string }[]>(this.url + '/contact'),
    delete: (id: string) => this.http.post<{ success: boolean; error: string }>(this.url + '/contact/delete/', { id }),
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
