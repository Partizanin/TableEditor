import {Component} from '@angular/core';
import {AppService} from './shared/AppService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AppService]
})
export class AppComponent {
  title = 'app';

  showModalAddUser() {
    console.log('show Modal');
  }

}
