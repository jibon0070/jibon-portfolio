import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  name: string = "A.R. Jibon";

  @Input() header_image: string | null = null;

  constructor() { }

  ngOnInit(): void {
  }

}
