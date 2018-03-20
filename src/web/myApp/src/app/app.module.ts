import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {ControllPannaleComponent} from './controll-pannale/controll-pannale.component';
import {FormsModule} from '@angular/forms';
import {ModalDialogComponent} from './modal-dialog/modal-dialog.component';
import {AppTabelComponent} from './app-tabel/app-tabel.component';
import {MatDialogModule} from '@angular/material';


@NgModule({
  declarations: [
    AppComponent,
    ControllPannaleComponent,
    ModalDialogComponent,
    AppTabelComponent
  ],
  imports: [
    BrowserModule, FormsModule, MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
