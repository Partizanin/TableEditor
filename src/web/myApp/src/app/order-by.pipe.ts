import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {

  transform(users: any, sortedField: string): any {
    console.log(`orderBy ${sortedField}`);
    return users.sort((user1, user2) => user1.name.localeCompare(user2.name));

  }

}
