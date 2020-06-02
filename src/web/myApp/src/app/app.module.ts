import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {ControlPanelComponent} from './controll-pannale/control-panel.component';
import {FormsModule} from '@angular/forms';
import {ModalDialogComponent} from './modal-dialog/modal-dialog.component';
import {AppTableComponent} from './app-tabel/app-table.component';
import {FilterPipe} from './filter.pipe';
import {OrderByPipe} from './order-by.pipe';
import {NavigationComponent} from './navigation/navigation.component';
import {HttpClientModule} from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    ControlPanelComponent,
    ModalDialogComponent,
    AppTableComponent,
    FilterPipe,
    OrderByPipe,
    NavigationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
