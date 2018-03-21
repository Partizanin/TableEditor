import {Pipe, PipeTransform} from '@angular/core';
import {User} from './shared/User';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(users: any, searchValue: any): any {
    if (searchValue == undefined || searchValue.length == 0) return users;

    return users.filter(function (user: User) {
      let usersFields = user.name + user.salary + user.startDate +
        user.age + user.position + user.office + user.id;

      return usersFields.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase());
    });

  }

}
