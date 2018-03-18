import {Component, OnInit} from '@angular/core';
import {Action, AppService} from '../shared/AppService';

declare var $: any;

@Component({
  selector: 'app-modal-dialog',
  templateUrl: './modal-dialog.component.html',
  styleUrls: ['./modal-dialog.component.css']
})
export class ModalDialogComponent implements OnInit {
  display = 'none';

  constructor(private service: AppService) {
    this.service.listen().subscribe((action: Action) => {
      this.showModel(action);
    })
  }

  ngOnInit() {
  }


  addNewUser() {
    console.log('addUser');
    $('#addModal').modal('hide');
  }

  private showModel(action: Action) {
    let modelType = action.data;

    if (modelType === 'open modal dialog edit') {
      console.log('open edit dialog')
    } else if (modelType == 'open modal dialog create') {
      console.log('open create dialog');
      $('#addModal').modal('show');
    }
  }
}
