import { Component, OnInit } from '@angular/core';
import {PortfolioService} from "../../services/portfolio.service";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit {
  loading: boolean = true;
  portfolios: { title: string; github_link: string; live_link: string; image_link: string }[] = [];
  api: string = environment.api;

  constructor(
    private readonly portfolioService: PortfolioService,
  ) { }

  ngOnInit(): void {
    this.portfolioService.index.subscribe({
      next: (portfolios) => {
        this.portfolios = portfolios;
        console.log(portfolios);
        this.loading = false;
      },
      error: (err) => {
        console.log(err);
        this.loading = false;
      }
    });
  }

}
