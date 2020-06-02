import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {User} from '../models/User';
import {Observable} from 'rxjs/Observable';
import {PageContainer} from "../models/PageContainer";

@Injectable()
export class TableService {

  constructor(private http: HttpClient) {
  }

  deleteUser(user: User) {
    console.log('delete User');
    this.http.delete('/api/' + user.id).subscribe(data => {
    }, error => {
      console.error(error)
    });
  }

  updateUser(user: User) {
    const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json',})};
    console.log('update User');
    let url = '/api/' + user.id;
    this.http.put(url, user, httpOptions).subscribe(data => {
    }, error => {
      console.error(error)
    });
  }

  readUsers(page, size) {
    console.log('read Users');
    let url = '/api/all';
    let params = {page: page, size: size}
    return this.http.get(url, {params: params}) as Observable<PageContainer>;
  }

  createUser(user: User) {
    this.http.post('/api/create', user).subscribe(data => {
    }, error => {
      console.error(error)
    });
    console.log('create User');
  }
}


