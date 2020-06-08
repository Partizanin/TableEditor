import {Component, OnInit} from '@angular/core';
import {Action, AppService} from '../shared/AppService';
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
  paginationLength: number = 4;
  totalPages: number = 0;
  pages: number[] = [];
  action: Action = new Action();

  constructor(private service: AppService) {
    this.service.userRemove.subscribe(() => {
      this.setPage();
    });

    this.service.tableInit.subscribe((data: PageContainer) => {
      this.totalPages = data.totalPages

      this.pagination = new PaginationService(
        this.paginationLength, this.currentPage, this.totalPages);

      this.pages = this.pagination.getPages();
    })

    this.service.itemsPerPageChangeEvent.subscribe((action: Action) => {
      if (action.data === "all") {
        this.currentPage = 1;
        this.pagination.setTotalPages(1)
        this.pagination.setCurrentPage(this.currentPage)
        this.totalPages = 1;
      } else {
        this.currentPage = 1;
        this.pagination.setCurrentPage(this.currentPage)
      }
    })

    this.service.totalPagesEvent.subscribe((totalPages) => {
      this.totalPages = totalPages;
      this.pagination.setTotalPages(this.totalPages);
      this.pages = this.pagination.getPages();
    });

  }

  ngOnInit() {


  }

  setPage(newPageNumber?) {
    if (newPageNumber === this.currentPage) return
    if (newPageNumber) this.currentPage = newPageNumber;

    this.action.actionEvent = 'new page';
    this.action.data = newPageNumber;

    this.service.updateUsers(this.action);
    this.pagination.setCurrentPage(newPageNumber);
  }

}
