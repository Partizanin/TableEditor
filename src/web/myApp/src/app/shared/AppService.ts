import {EventEmitter, Injectable} from '@angular/core';
import {User} from './User';
import {UserService} from './user-serwice.service';

@Injectable()
export class AppService {
  controlPannelActionEvent: EventEmitter<any> = new EventEmitter();
  searchValueChange: EventEmitter<any> = new EventEmitter();
  users: User[];

  itemsPerPageChangeEvent: EventEmitter<any> = new EventEmitter<any>();
  navigationActionEvent: EventEmitter<any> = new EventEmitter<any>();
  filteredUsers: User[];
  userInit: EventEmitter<any> = new EventEmitter<any>();
  userRemove: EventEmitter<any> = new EventEmitter<any>();

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
    let actionEvent = action.actionEvent;
    let user = action.data;

    if (actionEvent === 'edit') {

      this.userService.update(user);
      this.edithUserByID(user);
    } else {
      this.userService.create(user);
      this.users.push(user);
    }
  }

  removeUser(user: User) {
    let index = this.users.indexOf(user);
    this.users.splice(index, 1);
    this.userRemove.emit(this.users);
    this.userService.delete(user);
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

  private edithUserByID(user: User) {
    let findedIndex = this.users.findIndex(findedUser => findedUser.id == user.id);
    console.log(this.users[findedIndex]);
    this.users[findedIndex] = user;
    console.log(this.users[findedIndex]);
    /*todo: send action to navigation component to repaint page*/
  }
}

export class Action {
  actionEvent: string;
  data: any;
}
