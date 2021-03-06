import {Component, OnInit} from '@angular/core';
import {Action, AppService} from '../shared/AppService';
import {User} from '../models/User';

declare var $: any;

@Component({
  selector: 'app-modal-dialog',
  templateUrl: './modal-dialog.component.html',
  styleUrls: ['./modal-dialog.component.css']
})
export class ModalDialogComponent implements OnInit {
  readOnly = false;
  display = 'none';
  modalTitle: string;
  idInput: string;
  salaryInput: string;
  startDateInput: string;
  ageInput: string;
  officeInput: string;
  positionInput: string;
  nameInput: string;
  private isValid = true;

  constructor(private service: AppService) {
    this.service.controlPanelActionEvent.subscribe((action: Action) => {
      this.controlPanelActionListener(action);
    });
  }

  ngOnInit() {
  }

  successModalButtonClick() {
    let action = new Action();

    let user = new User(
      parseInt(this.idInput), this.nameInput, this.positionInput, this.officeInput,
      parseInt(this.ageInput), this.startDateInput, this.salaryInput);


    if (this.modalTitle === 'Create new user') {
      action.actionEvent = 'create';
      action.data = user;
    } else {
      action.actionEvent = 'edit';
      action.data = user;
    }

    this.service.modalDialogEvent(action);

    /*todo implement validation
    * hidlight invalid fields
    * https://getbootstrap.com/docs/4.0/components/forms/?#validation*/
    if (this.isValid) {
      $('#modal').modal('hide');
    } else {
      console.log('modal is invalid')
    }
  }

  private controlPanelActionListener(action: Action) {
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
    this.readOnly = false;

    this.idInput = '';
    this.nameInput = '';
    this.positionInput = '';
    this.officeInput = '';
    this.ageInput = '';
    this.startDateInput = '';
    this.salaryInput = '';

    this.modalTitle = 'Create new user';
    $('#modal').modal('show');
  }

  private showEditModalDialog(user: User) {
    this.readOnly = true;
    this.modalTitle = `Edit user ${user.name}`;

    this.idInput = user.id.toString();
    this.nameInput = user.name;
    this.positionInput = user.position;
    this.officeInput = user.office;
    this.ageInput = user.age.toString();
    this.startDateInput = user.startDate;
    this.salaryInput = user.salary;

    $('#modal').modal('show');
  }
}
