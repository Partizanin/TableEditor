import {User} from "./User";

export class PageContainer {
  totalElements: number;
  totalPages: number;
  data: User[];

  constructor(totalElements: number, totalPages: number, data: User[]) {
    this.totalElements = totalElements;
    this.totalPages = totalPages;
    this.data = data;
  }
}
