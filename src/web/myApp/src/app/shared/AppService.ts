import {EventEmitter, Injectable} from '@angular/core';
import {User} from './User';
import {employees} from './Employees';

@Injectable()
export class AppService {
  controlPannelActionEvent: EventEmitter<any> = new EventEmitter();
  modalDialogActionEvent: EventEmitter<any> = new EventEmitter();
  searchValueChange: EventEmitter<any> = new EventEmitter();
  users: User[];

  itemsPerPageChangeEvent: EventEmitter<any> = new EventEmitter<any>();
  navigationActionEvent: EventEmitter<any> = new EventEmitter<any>();
  filteredUsers: User[];

  constructor() {
    this.filteredUsers = [];
    this.users = employees;
  }

  changeItemsPerPageValue(action: Action) {
    this.itemsPerPageChangeEvent.emit(action);
  }


  modalDialogEvent(action: Action) {
    this.modalDialogActionEvent.emit(action);
  }


  changeSearchValue(action: Action) {
    this.searchValueChange.emit(action);
  }


  showModal(action: Action) {
    this.controlPannelActionEvent.emit(action);
  }


  updateUsers(action: Action) {
    this.navigationActionEvent.emit(action);
  }
}

export class Action {
  actionEvent: string;
  data: any;
}
