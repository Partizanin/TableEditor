import {Component, OnInit} from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-modal-dialog',
  templateUrl: './modal-dialog.component.html',
  styleUrls: ['./modal-dialog.component.css']
})
export class ModalDialogComponent implements OnInit {
  display = 'none';

  constructor() {
  }

  ngOnInit() {
  }


}
