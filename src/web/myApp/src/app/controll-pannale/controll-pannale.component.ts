import {Component, OnInit} from '@angular/core';
import {Action, AppService} from '../shared/AppService';

@Component({
  selector: 'app-controll-pannale',
  templateUrl: './controll-pannale.component.html',
  styleUrls: ['./controll-pannale.component.css']
})
export class ControllPannaleComponent implements OnInit {
  selectValues = ['10', '15', '20', 'all'];
  selectedValue: string = '10';
  prewiousSelectedWalue = this.selectedValue;
  searchValue: string;
  buttonTitle = 'All fields';

  constructor(private service: AppService) {

  }


  ngOnInit(): void {
  }

  showCreateModal() {
    let action = new Action();
    action.actionEvent = 'open modal dialog create';
    action.data = `open modal dialog create`;
    this.service.showModal(action);
  }

  selectedChange(event) {
    console.log(`changed from ${this.prewiousSelectedWalue} to ${event.target.value}`);
    this.prewiousSelectedWalue = this.selectedValue;
  }

  changeInput(event) {
    let action = new Action();
    action.actionEvent = 'new search value';
    action.data = event;
    this.service.changeSearchValue(action)
  }

  searchColumnSelect(event) {
    this.buttonTitle = event.target.innerText;
  }
}
