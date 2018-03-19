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

  constructor(private service: AppService) {
  }


  ngOnInit(): void {
  }

  modalShow(modelType: string) {
    let action = new Action();
    action.event = 'click';
    action.data = `open modal dialog ${modelType}`;
    this.service.showModal(action);
  }

  selectedChange(event) {
    console.log(`changed from ${this.prewiousSelectedWalue} to ${event.target.value}`);
    this.prewiousSelectedWalue = this.selectedValue;
  }
}
