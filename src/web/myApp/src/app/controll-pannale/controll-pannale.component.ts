import {Component, EventEmitter, OnInit, Output} from '@angular/core';
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

  @Output() onClick = new EventEmitter();

  constructor(private service: AppService) {
  }


  ngOnInit(): void {
  }

  modalShow(modelType: string) {
    console.log(modelType);

    this.onClick.emit('emit click action from controll pannel component');
    let action = new Action();
    action.event = 'click';
    action.data = `open modal dialog ${modelType}`;
    this.service.changeAction(action);
  }

  selectedChange(event) {
    console.log(`changed from ${this.prewiousSelectedWalue} to ${event.target.value}`);
    this.prewiousSelectedWalue = this.selectedValue;
  }
}
