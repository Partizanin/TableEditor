import {expect} from 'chai';
import 'mocha';
import {OrderByPipe} from './order-by.pipe';

let users = [
  {
    id: 1, name: 'Airi Satou', position: 'Accountant',
    office: 'Tokyo', age: 33, startDate: '2008/11/28', salary: '$162,700'
  },
  {
    id: 2,
    name: 'Angelica Ramos',
    position: 'Chief Executive Officer (CEO)',
    office: 'London',
    age: 47,
    startDate: '09.10.2009',
    salary: '$1,200,000'
  },
  {
    id: 3,
    name: 'Ashton Cox',
    position: 'Junior Technical Author',
    office: 'San Francisco',
    age: 66,
    startDate: '12.01.2009',
    salary: '$86,000'
  },
  {id: 4, name: 'Bradley Greer', position: 'Software Engineer', office: 'London', age: 41, startDate: '13.10.2012', salary: '$132,000'},
  {
    id: 5,
    name: 'Brenden Wagner',
    position: 'Software Engineer',
    office: 'San Francisco',
    age: 28,
    startDate: '07.06.2011',
    salary: '$206,850'
  },
  {
    id: 6,
    name: 'Brielle Williamson',
    position: 'Integration Specialist',
    office: 'New York',
    age: 61,
    startDate: '02.12.2012',
    salary: '$372,000'
  },
  {id: 7, name: 'Bruno Nash', position: 'Software Engineer', office: 'London', age: 38, startDate: '03.05.2011', salary: '$163,500'},
  {id: 8, name: 'Caesar Vance', position: 'Pre-Sales Support', office: 'New York', age: 21, startDate: '12.12.2011', salary: '$106,450'},
  {id: 9, name: 'Cara Stevens', position: 'Sales Assistant', office: 'New York', age: 46, startDate: '06.12.2011', salary: '$145,600'},
  {
    id: 10,
    name: 'Cedric Kelly',
    position: 'Senior Javascript Developer',
    office: 'Edinburgh',
    age: 22,
    startDate: '29.03.2012',
    salary: '$433,060'
  },];

let orderByPipe = new OrderByPipe();

function log(expected, actual) {
  console.log(`expected: ${expected} actual: ${actual}`);
}

/*todo: finished writing all tests*/
describe('sort function', () => {

  it('should sort by id ', function () {
    users = orderByPipe.transform(users, 'id', false);
    for (let _i = 0; _i < users.length; _i++) {
      let actual = users[_i].id;
      let expected = _i + 1;
      expect(actual).to.eql(expected);
    }

    users = orderByPipe.transform(users, 'id', true);

    for (let _i = 0; _i < users.length; _i++) {
      let actual = users[_i].id;
      let expected = 10 - _i;
      expect(actual).to.eql(expected);
    }

  });

  it('should sort by name', function () {
    users = orderByPipe.transform(users, 'id', false);
    for (let _i = 0; _i < users.length; _i++) {
      let actual = users[_i].name;
      let expected = _i + 1;
      expect(actual).to.eql(expected);
    }
  });

  it('should sort by position', function () {

  });

  it('should sort by office', function () {

  });

  it('should sort by age', function () {

  });
  it('should sort by startDate', function () {

  });

  it('should sort by sallary', function () {

  });

});

