import {Component} from '@angular/core';

@Component({
    selector: 'my-component',
    template: '<h2>{{title}}</h2>',

})
export class AppComponent {
    title = 'My component';
}