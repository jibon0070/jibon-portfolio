import { Component, OnInit } from '@angular/core';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private readonly titleService: Title
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle('A.R. Jibon');
  }

}
