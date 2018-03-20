import {EventEmitter, Injectable} from '@angular/core';
import {User} from './User';

@Injectable()
export class AppService {
  actionEvent: EventEmitter<any> = new EventEmitter();
  users: User[] = [];


  constructor() {
    let user1 = new User(1, 'Airi Satou', 'Accountant', 'Tokyo', 33, '2008/11/28', '$162,700');

    let user2 = new User(2, 'Angelica Ramos', 'Chief Executive Officer (CEO)', 'London', 47, '2009/10/09', '$1,200,000');

    let user3 = new User(3, 'Ashton Cox', 'Junior Technical Author', 'San Francisco', 66, '2009/01/12', '$86,000');

    let user4 = new User(4, 'Bradley Greer', 'Software Engineer', 'London', 41, '2012/10/13', '$132,000');

    this.users.push(user1, user2, user3, user4);

  }


  showModal(actyion: Action) {
    this.actionEvent.emit(actyion);
  };

}

export class Action {
  actionEvent: string;
  data: any;
}
