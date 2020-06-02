export class User {

  id: number;
  name: string;
  position: string;
  office: string;
  age: number;
  startDate: string;
  salary: string;

  constructor(Id?: number, Name?: string, Position?: string, Office?: string, Age?: number, StartDate?: string, Salary?: string) {
    this.id = Id;
    this.name = Name;
    this.position = Position;
    this.office = Office;
    this.age = Age;
    this.startDate = StartDate;
    this.salary = Salary;
  }
}
