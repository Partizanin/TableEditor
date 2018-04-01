import {Component} from '@angular/core';
import {AppService} from './shared/AppService';
import {UserSerwice} from './shared/user-serwice.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AppService, UserSerwice]
})
export class AppComponent {
  title = 'app';

  constructor(private service: UserSerwice) {
    this.service.getData();
  }

  showModalAddUser() {
    console.log('show Modal');
  }

}
