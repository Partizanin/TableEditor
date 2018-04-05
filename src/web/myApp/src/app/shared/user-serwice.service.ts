import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {User} from './User';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) {
  }

  delete(user: User) {
    console.log('delete User');
    this.http.delete('/api/' + user.id).subscribe(data => {
    }, error => {
      console.error(error)
    });
  }

  update(user: User) {

    const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json',})};
    console.log('update User');
    let url = '/api/' + user.id;
    this.http.put(url, user, httpOptions).subscribe(data => {
    }, error => {
      console.error(error)
    });
  }

  read() {
    console.log('read Users');
    let url = '/api/all';
    return this.http.get(url) as Observable<User[]>;
  }

  create(user: User) {
    this.http.post('/api/create', user).subscribe(data => {
    }, error => {
      console.error(error)
    });
    console.log('create User');
  }
}


