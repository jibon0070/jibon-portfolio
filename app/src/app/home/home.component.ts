import {Component, OnInit} from '@angular/core';
import {Title} from "@angular/platform-browser";
import {HomeService} from "../services/home.service";
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  header_image!: string;
  about_me_image!: string;
  loading: boolean = true;
  experience!: string;
  clients!: string;
  projects!: string;

  constructor(
    private readonly titleService: Title,
    private readonly homeService: HomeService
  ) {
  }

  ngOnInit(): void {
    this.titleService.setTitle('A.R. Jibon');
    this.homeService.getHomeData.subscribe({
      next: (data) => {
        if (data.header_image)
          this.header_image = environment.api + data.header_image;
        if(data.about_me_image)
          this.about_me_image = environment.api + data.about_me_image;
        if (data.experience)
          this.experience = data.experience;
        if (data.clients)
          this.clients = data.clients;
        if (data.projects)
          this.projects = data.projects;
        this.loading = false;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

}
