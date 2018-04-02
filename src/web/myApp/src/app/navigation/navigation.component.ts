import {Component, OnInit} from '@angular/core';
import {Action, AppService} from '../shared/AppService';
import {User} from '../shared/User';
import {Paginatoin} from './Pagination';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  users: User[];
  pagination: Paginatoin;
  currentPage: number;
  itemsPerPage: any;
  paginationLength: number;
  totalPages: number;
  pages: number[];

  constructor(private service: AppService) {
    this.service.itemsPerPageChangeEvent.subscribe((action: Action) => {
      this.controlPannelActionListener(action);
    });
    this.service.userRemove.subscribe((users: User[]) => {
      /*todo bugfix
      * when remove user you shut to first page
      * */
      this.pagination.setUsers(users);
      this.setPage();
    });


    this.currentPage = 1;
    this.itemsPerPage = 10;
    this.paginationLength = 6;

  }

  ngOnInit() {
    this.pages = [];
    this.users = [];

    this.service.userInit.subscribe((users: User[]) => {
      this.paginationInit();
      this.pagination.users = users;
    });

  }

  setPage(newPageNumber?) {
    if (newPageNumber) this.currentPage = newPageNumber;

    this.users = this.pagination.getUsers(this.currentPage, this.itemsPerPage);
    this.currentPage = this.pagination.getCurrentPage();
    this.pages = this.pagination.getPages();

    let action = new Action();

    action.actionEvent = 'new users';
    action.data = this.users;

    this.service.updateUsers(action);
  }

  private paginationInit() {
    this.pagination = new Paginatoin(
      this.itemsPerPage, this.paginationLength,
      this.service.users, this.currentPage);

    this.totalPages = this.pagination.totalPages;
    this.pages = this.pagination.pages;
    this.users = this.pagination.getUsers(this.currentPage, this.itemsPerPage);
    let action = new Action();
    action.actionEvent = 'new users';
    action.data = this.users;
    this.service.updateUsers(action);
  }

  private controlPannelActionListener(action: Action) {
    let actionEvent: string = action.actionEvent;
    switch (actionEvent) {
      case 'new itemPerPage value':
        this.setItemPerPage(action.data);
        break;
    }
  }

  private setItemPerPage(itemPerPage: any) {
    this.itemsPerPage = itemPerPage;
    if (this.itemsPerPage == 'all') {
      this.currentPage = 1;
      this.itemsPerPage = itemPerPage;
      this.setPage();
    } else {
      this.itemsPerPage = itemPerPage;
      this.pagination.setItemPerPage(itemPerPage);
      this.setPage(1);
      this.totalPages = this.pagination.totalPages;
    }
  }
}
