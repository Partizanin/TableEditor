import {Component, OnInit} from '@angular/core';
import {Action, AppService} from '../shared/AppService';

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.css']
})
export class ControlPanelComponent implements OnInit {
  itemsPerPage = ['10', '15', '20', 'all'];
  selectedItemPerPage: string = '10';
  previousSelectedValue = this.selectedItemPerPage;
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
    this.previousSelectedValue = this.selectedItemPerPage;
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
      action.data = this.selectedItemPerPage;
      this.service.changeItemsPerPageValue(action);

    }
  }

  searchColumnSelect(event) {
    this.searchByColumn = event.target.innerText;
  }
}
