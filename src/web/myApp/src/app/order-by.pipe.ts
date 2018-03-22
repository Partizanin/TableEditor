import {Pipe, PipeTransform} from '@angular/core';
import {User} from './shared/User';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {

  transform(users: any, sortedField: string, reversSort: boolean = false): any {
    let sortedUser = users.sort((user1: User, user2: User) => {

      if (reversSort) {
        let temp = user1;
        user1 = user2;
        user2 = temp;
      }

      let user1SortFiled = '';
      let user2SortFiled = '';

      switch (sortedField) {

        case 'name': {
          user1SortFiled = user1.name;
          user2SortFiled = user2.name;
          break
        }

        case 'id': {
          user1SortFiled = user1.id.toString();
          user2SortFiled = user2.id.toString();
          break
        }

        case 'office': {
          user1SortFiled = user1.office;
          user2SortFiled = user2.office;
          break
        }

        case 'age': {
          user1SortFiled = user1.age.toString();
          user2SortFiled = user2.age.toString();
          break
        }

        case 'position': {
          user1SortFiled = user1.position;
          user2SortFiled = user2.position;
          break
        }

        case 'startdate': {
          user1SortFiled = user1.startDate;
          user2SortFiled = user2.startDate;
          break
        }

        case 'salary': {/*todo fix bag with sallary format and comparison*/
          user1SortFiled = user1.salary.replace('$', '').replace(',', '');
          user2SortFiled = user2.salary.replace('$', '').replace(',', '');
          break
        }
      }

      let result = 0;

      if (sortedField !== 'salary') {

        result = user1SortFiled.localeCompare(user2SortFiled);
      } else {//symbol '+' convert srtring to number
        result = parseFloat(user1SortFiled) - parseFloat(user2SortFiled);
      }


      return result;
    });

    return sortedUser;
  }

}
