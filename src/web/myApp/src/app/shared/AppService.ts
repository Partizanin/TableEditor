import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AppService {
  private _listners = new Subject<Action>();

  listen(): Observable<Action> {
    return this._listners.asObservable();
  }

  changeAction(changeAction: Action) {
    this._listners.next(changeAction);
  }

}

export class Action {
  event: string;
  data: string;
}
