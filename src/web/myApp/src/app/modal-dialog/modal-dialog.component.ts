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
  private isValid = true;

  constructor(private service: AppService) {
    this.service.controlPannelActionEvent.subscribe((action: Action) => {
      this.controlPannelActionListener(action);
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

    /*todo implement validation
    * hidlight invalid fields
    * https://getbootstrap.com/docs/4.0/components/forms/?#validation*/
    if (this.isValid) {
      $('#modal').modal('hide');
    } else {
      console.log('modal is invalid')
    }
  }

  private controlPannelActionListener(action: Action) {
    let actionEvent = action.actionEvent;
    switch (actionEvent) {
      case 'open modal dialog create':
        this.showCreateModal();
        break;
      case 'open modal dialog edit':
        this.showEditModalDialog(action.data);
        break;
    }
  }

  private showCreateModal() {

    this.idInput = '';
    this.nameInput = '';
    this.positionInput = '';
    this.officeInput = '';
    this.ageInput = '';
    this.startDateInput = '';
    this.sallaryInput = '';

    console.log('open create dialog');
    this.modalTitle = 'Create new user';
    $('#modal').modal('show');
  }

  private showEditModalDialog(user: User) {
    console.log('open edit dialog');
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
