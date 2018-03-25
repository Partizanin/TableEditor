import {Pipe, PipeTransform} from '@angular/core';
import {User} from './shared/User';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(users: any, searchValue: any, byColumn: any): any {

    if (searchValue == undefined || searchValue.length == 0) return users;

    return users.filter(function (user: User) {


      let expectedValue = '';

      switch (byColumn) {
        case 'All fields':
          console.log('all fields');
          expectedValue = user.name + user.salary + user.startDate +
            user.age + user.position + user.office + user.id;
          break;
        case'Id':
          expectedValue = user.id.toString();
          console.log('id');
          break;
        case'Name':
          expectedValue = user.name;
          console.log('name');
          break;
        case'Position':
          expectedValue = user.position;
          console.log('position');
          break;
        case'Office':
          expectedValue = user.office;
          console.log('office');
          break;
        case'Age':
          expectedValue = user.age.toString();
          console.log('age');
          break;
        case'Start Date':
          expectedValue = user.startDate;
          console.log('start date');
          break;
        case'Salary':
          expectedValue = user.salary;
          console.log('salary');
          break;
      }

      return expectedValue.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase());
    });

  }

}
