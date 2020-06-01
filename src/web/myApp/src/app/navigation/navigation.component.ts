import {Component, OnInit} from '@angular/core';
import {Action, AppService} from '../shared/AppService';
import {User} from '../models/User';
import {PaginationService} from './PaginationService';
import {PageContainer} from "../models/PageContainer";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  pagination: PaginationService;
  currentPage: number = 1;
  paginationLength: number = 3;
  totalPages: number = 0;
  pages: number[] = [];
  action: Action = new Action();

  constructor(private service: AppService) {
    this.service.userRemove.subscribe((users: User[]) => {
      this.setPage();
    });

    this.service.tableInit.subscribe((data: PageContainer) => {
      this.totalPages = data.totalPages

      this.pagination = new PaginationService(
        this.paginationLength, this.currentPage, this.totalPages);

      this.pages = this.pagination.getPages();
    })

    this.currentPage = 1;
    this.paginationLength = 4;
  }

  ngOnInit() {


  }

  setPage(newPageNumber?) {
    if (newPageNumber) this.currentPage = newPageNumber;

    this.action.actionEvent = 'new page';
    this.action.data = newPageNumber;

    this.service.updateUsers(this.action);
    this.pagination.setCurrentPage(newPageNumber);
    this.pages = this.pagination.getPages();
  }

}
