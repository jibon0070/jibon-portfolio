import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {

  constructor() {
  }

  @Input() percent: number | null = null;

  ngOnInit(): void {
  }

}
