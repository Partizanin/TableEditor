import {Component} from '@angular/core';
import {AppService} from './shared/AppService';
import {TableService} from './shared/user-serwice.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AppService, TableService]
})
export class AppComponent {
}
