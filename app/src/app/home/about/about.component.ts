import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  constructor() {
  }

  @Input() about_me_image: string | null = null;
  @Input() experience: string | null = null;
  @Input() clients: string | null = null;
  @Input() projects: string | null = null;

  ngOnInit(): void {
  }

}
