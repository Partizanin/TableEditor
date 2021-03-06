import {Pipe, PipeTransform} from '@angular/core';
import {User} from './models/User';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  private static getFilteredUsers(byColumn: any, user: User, searchValue: any) {
    let expectedValue = '';

    switch (byColumn) {
      case 'All columns':
        expectedValue = user.name + user.salary + user.startDate +
          user.age + user.position + user.office + user.id;
        break;
      case'Id':
        expectedValue = user.id.toString();
        break;
      case'Name':
        expectedValue = user.name;
        break;
      case'Position':
        expectedValue = user.position;
        break;
      case'Office':
        expectedValue = user.office;
        break;
      case'Age':
        expectedValue = user.age.toString();
        break;
      case'Start Date':
        expectedValue = user.startDate;
        break;
      case'Salary':
        expectedValue = user.salary;
        break;
    }

    return expectedValue.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase());
  }

  transform(users: any, searchValue: any, byColumn: any): any {
    console.log(`filter event  ${searchValue} ${byColumn}`);

    if (searchValue == undefined || searchValue.length == 0) return users;

    return users.filter(user => {
      return FilterPipe.getFilteredUsers(byColumn, user, searchValue);
    });
    // console.log(`filteredUsers ${filteredUsers.length}`);
    // return filteredUsers;

  }
}
