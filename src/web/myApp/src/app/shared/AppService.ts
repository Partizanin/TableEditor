import {EventEmitter, Injectable} from '@angular/core';
import {User} from './User';
import {UserService} from './user-serwice.service';

@Injectable()
export class AppService {
  controlPannelActionEvent: EventEmitter<any> = new EventEmitter();
  modalDialogActionEvent: EventEmitter<any> = new EventEmitter();
  searchValueChange: EventEmitter<any> = new EventEmitter();
  users: User[];

  itemsPerPageChangeEvent: EventEmitter<any> = new EventEmitter<any>();
  navigationActionEvent: EventEmitter<any> = new EventEmitter<any>();
  filteredUsers: User[];
  userInit: EventEmitter<any> = new EventEmitter<any>();

  constructor(private userService: UserService) {
    this.filteredUsers = [];
    this.users = [];
    this.userService.read().subscribe((users) => {
        this.users = users;
        this.userInit.emit(this.users);
      }
    );
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

  removeUser(user: User) {
    /*todo bug fix
    * when remove user, you jump on the first page with all user rows but not with 10 rows
    * */
    let index = this.users.indexOf(user);
    this.users.splice(index, 1);
    this.userInit.emit(this.users);
    return this.users;
  }
}

export class Action {
  actionEvent: string;
  data: any;
}
