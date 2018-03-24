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

  constructor(private service: AppService) {
    this.service.searchValueChange.subscribe((action: Action) => {
      this.controlPannelActionListener(action);
    });

    this.service.modalDialogActionEvent.subscribe((action: Action) => {
      this.modalDialogActionListener(action);
    });
  }

  private controlPannelActionListener(action: Action) {
    let actionEvent: string = action.actionEvent;
    switch (actionEvent) {
      case 'new search value':
        this.searchValue = action.data;
        break;
    }
  }

  ngOnInit() {
    this.sortedIconClass = 'fa fa-sort-amount-asc';
    this.defaultIconClass = 'fa fa-exchange fa-rotate-90';
    this.reverseSort = false;
    this.orderByField = 'id';
    this.users = this.service.users;
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
      this.users.splice(index, 1);
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

  private modalDialogActionListener(action: Action) {
    let actionEvent = action.actionEvent;

    switch (actionEvent) {
      case 'create':
        this.createNewUser(action.data);
        break;
      case 'edit':
        this.editUser(action.data);
        break;
    }
  }

  private editUser(user: User) {
    let findedUser = this.users.find(arrayUser => arrayUser.id == user.id);
    let index = this.users.indexOf(findedUser);
    this.users[index] = user;
  }

  private createNewUser(user: User) {
    this.users.push(user);
  }
}
