import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {User} from './User';

@Injectable()
export class UserSerwice {

  constructor(private http: HttpClient) {
  }

  /*todo connect serwice with apllication*/
  delete(user: User) {
    console.log('delete User');
    this.http.delete('/api/' + user.id);
  }

  update(user: User) {
    console.log('update User');
    this.http.put('/api/' + user.id, user);
  }

  read() {
    console.log('read Users');
    this.http.get('/api/all').subscribe(data => {
      console.log(data);
    });
  }

  create(user: User) {
    this.http.post('/api/create/', user);
    console.log('create User');
  }
}


