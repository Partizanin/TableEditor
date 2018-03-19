import {EventEmitter, Injectable} from '@angular/core';

@Injectable()
export class AppService {
  actionEvent: EventEmitter<any> = new EventEmitter();


  constructor() {
  }

  showModal(actyion: Action) {
    this.actionEvent.emit(actyion);
  };

}

export class Action {
  event: string;
  data: string;
}
