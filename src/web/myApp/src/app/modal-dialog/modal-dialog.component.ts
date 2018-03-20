import {Component, OnInit} from '@angular/core';
import {Action, AppService} from '../shared/AppService';
import {User} from '../shared/User';

declare var $: any;

@Component({
  selector: 'app-modal-dialog',
  templateUrl: './modal-dialog.component.html',
  styleUrls: ['./modal-dialog.component.css']
})
export class ModalDialogComponent implements OnInit {
  display = 'none';
  modalTitle: string;
  idInput: string;
  sallaryInput: string;
  startDateInput: string;
  ageInput: string;
  officeInput: string;
  positionInput: string;
  nameInput: string;
  isHidden: true;
  private isValid = true;

  constructor(private service: AppService) {
    this.service.actionEvent.subscribe((action: Action) => {
      this.showModel(action);
    });

  }

  ngOnInit() {

  }


  successModalButtonClick() {

    if (this.modalTitle === 'Create new user') {
      console.log('addUser');
    } else {
      console.log('edit User');
    }


    if (this.isValid) {
      $('#modal').modal('hide');
    } else {
      console.log('modal is invalid')
    }
  }

  private showModel(action: Action) {
    console.log(`is hidden ${this.isHidden}`);

    let modelType = action.actionEvent;

    if (modelType === 'open modal dialog edit') {
      this.showEditModalDialog(action);
    } else if (modelType == 'open modal dialog create') {
      this.showCreateModal();
    }
  }

  private showCreateModal() {
    console.log('open create dialog');
    this.modalTitle = 'Create new user';
    $('#modal').modal('show');
  }

  private showEditModalDialog(action: Action) {
    console.log('open edit dialog');
    let user: User = action.data;
    this.modalTitle = `Edit user ${user.name}`;

    this.idInput = user.id.toString();
    this.nameInput = user.name;
    this.positionInput = user.position;
    this.officeInput = user.office;
    this.ageInput = user.age.toString();
    this.startDateInput = user.startDate;
    this.sallaryInput = user.salary;

    $('#modal').modal('show');
  }
}
