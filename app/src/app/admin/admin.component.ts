import { Component, OnInit } from '@angular/core';
import {Title} from "@angular/platform-browser";
import {SocialAuthService} from "angularx-social-login";
import {UsersService} from "../services/users.service";
import {Router} from "@angular/router";
import {Config} from "../helpers/config";
import {Helpers} from "../helpers/Helpers";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(
    private readonly title: Title,
    private readonly socialAuthService: SocialAuthService,
    private readonly usersService: UsersService,
    private readonly router: Router
  ) { }

  links: {
    name: string,
    link: string;
  }[] = [
    'header-image',
    "about-me-image",
    "site-options",
    "experience",
    "portfolio",
    "testimonials",
    "contact",
  ].map(link => ({name: Helpers.titlecase(link.replace('-', ' ')), link: link}));

  ngOnInit(): void {
    this.title.setTitle('Admin');
  }

  logout() {
    localStorage.removeItem(Config.token);
    this.usersService.$is_logged.emit(false);
    this.socialAuthService.signOut(true).then(() => {
      this.router.navigate(['/admin/login']);
    });

  }
}
