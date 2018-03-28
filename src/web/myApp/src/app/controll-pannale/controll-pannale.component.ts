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
  searchByColumn = 'All columns';

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
    let action = new Action();
    action.actionEvent = 'new itemPerPage value';
    action.data = event.target.value;
    this.service.changeItemsPerPageValue(action);
    this.prewiousSelectedWalue = this.selectedValue;
  }

  changeInput(event) {
    let action = new Action();
    action.actionEvent = 'new search value';
    action.data = {
      searchValue: event,
      searchColumn: this.searchByColumn
    };
    this.service.changeSearchValue(action);
    if (event.length > 0) {
      action.actionEvent = 'new itemPerPage value';
      action.data = 'all';
      this.service.changeItemsPerPageValue(action);
    } else {
      action.actionEvent = 'new itemPerPage value';
      action.data = 2;
      this.service.changeItemsPerPageValue(action);

    }
  }

  searchColumnSelect(event) {
    this.searchByColumn = event.target.innerText;
  }
}
