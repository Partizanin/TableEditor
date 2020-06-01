import {Component, OnInit} from '@angular/core';
import {Action, AppService} from '../shared/AppService';
import {User} from '../models/User';
import {PageContainer} from "../models/PageContainer";

@Component({
  selector: 'app-table',
  templateUrl: './app-table.component.html',
  styleUrls: ['./app-table.component.css']

})

export class AppTableComponent implements OnInit {
  users: User[];
  orderByField: string;
  reverseSort: boolean;
  defaultIconClass: string;
  sortedIconClass: string;
  searchValue: string;
  searchColumn: string;
  pageSize: string;
  pageNumber: number;
  totalElements: number;

  constructor(private service: AppService) {
    this.service.searchValueChange.subscribe((action: Action) => {
      this.controlPanelActionListener(action);
    });

    this.service.navigationActionEvent.subscribe((action: Action) => {
      this.pageNumber = action.data;
      this.updateTable(this.pageNumber, this.pageSize);
    });

    this.service.tableInit.subscribe((data: PageContainer) => {
      this.users = data.data;
      this.pageSize = data.pageSize
      this.pageNumber = 1;
      this.totalElements = data.totalElements;
    });

    this.service.itemsPerPageChangeEvent.subscribe((action: Action) => {
      if (action.data === "all") {
        this.pageNumber = 1;
        this.pageSize = this.totalElements.toString();
      } else {
        this.pageSize = action.data;
      }
      this.updateTable(this.pageNumber, this.pageSize);
    });
  }

  ngOnInit() {
    this.sortedIconClass = 'fa fa-sort-amount-asc';
    this.defaultIconClass = 'fa fa-exchange fa-rotate-90';
    this.reverseSort = false;
    this.orderByField = 'id';
    this.users = this.service.filteredUsers;
  }

  showEdithModal(user: User) {
    let action = new Action();
    action.actionEvent = 'open modal dialog edit';
    action.data = user;
    this.service.showModal(action);
  }

  removeUser(user: User) {
    let foundedUser = this.users.find(arrayUser => arrayUser.id == user.id);
    let index = this.users.indexOf(foundedUser);
    if (index > -1) {
      this.service.removeUser(user);

    }
  }

  private controlPanelActionListener(action: Action) {
    let actionEvent: string = action.actionEvent;
    switch (actionEvent) {
      case 'new search value':
        this.searchValue = action.data.searchValue;
        this.searchColumn = action.data.searchColumn;
        break;
    }
  }

  updateTable(pageNumber, pageSize) {
    this.service.getUsers(pageNumber, pageSize).subscribe((pageContainer) => {
      this.users = pageContainer.data;
      this.totalElements = pageContainer.totalElements;
      this.service.setTotalPages(pageContainer.totalPages);
    })
  }

  sortClick(event) {
    let target = event.target || event.srcElement || event.currentTarget;
    this.orderByField = target.innerHTML.toLocaleLowerCase();
    this.reverseSort = !this.reverseSort;

    if (this.reverseSort) {
      this.sortedIconClass = 'fa fa-sort-amount-desc'
    } else {
      this.sortedIconClass = 'fa fa-sort-amount-asc'
    }

  }

  getSortIcon(columnName: string) {
    columnName = columnName.toLocaleLowerCase();
    return this.orderByField === columnName ? this.sortedIconClass : this.defaultIconClass;
  }

}
