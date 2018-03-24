import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  currentPage: number = 1;
  page: number = 1;


  constructor() {
  }

  ngOnInit() {
  }

  setPage(number: number) {

  }
}
