import {Component, OnInit} from '@angular/core';
import {Action, AppService} from '../shared/AppService';
import {User} from '../shared/User';

@Component({
  selector: 'app-tabel',
  templateUrl: './app-tabel.component.html',
  styleUrls: ['./app-tabel.component.css']

})

export class AppTabelComponent implements OnInit {
  users: User[];
  orderByField: string;
  reverseSort: boolean;
  defaultIconClass: string;
  sortedIconClass: string;
  searchValue: string;
  searchColumn: string;

  constructor(private service: AppService) {
    this.service.searchValueChange.subscribe((action: Action) => {
      this.controlPannelActionListener(action);
    });

    this.service.navigationActionEvent.subscribe((action: Action) => {
      this.navigationActionListener(action);
    });
  }

  ngOnInit() {
    this.sortedIconClass = 'fa fa-sort-amount-asc';
    this.defaultIconClass = 'fa fa-exchange fa-rotate-90';
    this.reverseSort = false;
    this.orderByField = 'id';
    this.users = this.service.filteredUsers;
  }

  private controlPannelActionListener(action: Action) {
    let actionEvent: string = action.actionEvent;
    switch (actionEvent) {
      case 'new search value':
        this.searchValue = action.data.searchValue;
        this.searchColumn = action.data.searchColumn;
        break;
    }
  }

  private navigationActionListener(action: Action) {
    this.users = action.data;
  }

  showEdithMoadal(user: User) {
    let action = new Action();
    action.actionEvent = 'open modal dialog edit';
    action.data = user;
    this.service.showModal(action);
  }

  removeUser(user: User) {
    let findedUser = this.users.find(arrayUser => arrayUser.id == user.id);
    let index = this.users.indexOf(findedUser);
    if (index > -1) {
      this.service.removeUser(user);

    }
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