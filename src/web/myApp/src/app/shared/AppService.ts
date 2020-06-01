import {EventEmitter, Injectable} from '@angular/core';
import {User} from '../models/User';
import {TableService} from './user-serwice.service';

@Injectable()
export class AppService {
  controlPanelActionEvent: EventEmitter<any> = new EventEmitter();
  searchValueChange: EventEmitter<any> = new EventEmitter();
  users: User[];

  itemsPerPageChangeEvent: EventEmitter<any> = new EventEmitter<any>();
  navigationActionEvent: EventEmitter<any> = new EventEmitter<any>();
  filteredUsers: User[];
  tableInit: EventEmitter<any> = new EventEmitter<any>();
  userRemove: EventEmitter<any> = new EventEmitter<any>();

  constructor(private userService: TableService) {
    this.filteredUsers = [];
    this.users = [];

    this.userService.readUsers(1, 10).subscribe((data) => {
        this.users = data.data;
        this.tableInit.emit(data);
      }
    );
  }

  getUsers(pageNumber, pageSize) {
    return this.userService.readUsers(pageNumber, pageSize)
  }

  changeItemsPerPageValue(action: Action) {
    this.itemsPerPageChangeEvent.emit(action);
  }

  modalDialogEvent(action: Action) {
    let actionEvent = action.actionEvent;
    let user = action.data;

    if (actionEvent === 'edit') {

      this.userService.updateUser(user);
      this.edithUserByID(user);
    } else {
      this.userService.createUser(user);
      this.users.push(user);
    }
  }

  removeUser(user: User) {
    let index = this.users.indexOf(user);
    this.users.splice(index, 1);
    this.userRemove.emit(this.users);
    this.userService.deleteUser(user);
  }

  changeSearchValue(action: Action) {
    this.searchValueChange.emit(action);
  }

  showModal(action: Action) {
    this.controlPanelActionEvent.emit(action);
  }

  updateUsers(action: Action) {
    this.navigationActionEvent.emit(action);
  }

  private edithUserByID(user: User) {
    let foundedIndex = this.users.findIndex(foundedUser => foundedUser.id == user.id);
    console.log(this.users[foundedIndex]);
    this.users[foundedIndex] = user;
    console.log(this.users[foundedIndex]);
  }
}

export class Action {
  actionEvent: string;
  data: any;
}
