import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {ControllPannaleComponent} from './controll-pannale/controll-pannale.component';
import {FormsModule} from '@angular/forms';
import {ModalDialogComponent} from './modal-dialog/modal-dialog.component';
import {AppTabelComponent} from './app-tabel/app-tabel.component';
import {MatDialogModule, MatFormFieldModule, MatInputModule} from '@angular/material';
import {FilterPipe} from './filter.pipe';
import {OrderByPipe} from './order-by.pipe';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    ControllPannaleComponent,
    ModalDialogComponent,
    AppTabelComponent,
    FilterPipe,
    OrderByPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
