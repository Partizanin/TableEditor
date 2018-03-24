import {EventEmitter, Injectable} from '@angular/core';
import {User} from './User';
import {employees} from './Employees';

@Injectable()
export class AppService {
  controlPannelActionEvent: EventEmitter<any> = new EventEmitter();
  modalDialogActionEvent: EventEmitter<any> = new EventEmitter();
  searchValueChange: EventEmitter<any> = new EventEmitter();
  users: User[];


  constructor() {
    this.users = employees;

  }

  modalDialogEvent(action: Action) {
    this.modalDialogActionEvent.emit(action);
  }


  changeSearchValue(action: Action) {
    this.searchValueChange.emit(action);
  }


  showModal(actyion: Action) {
    this.controlPannelActionEvent.emit(actyion);
  };

}

export class Action {
  actionEvent: string;
  data: any;
}
