import {User} from "./User";

export class PageContainer {
  totalElements: number;
  totalPages: number;
  data: User[];
  pageSize: string;

  constructor(totalElements: number, pageSize: string, totalPages: number, data: User[]) {
    this.totalElements = totalElements;
    this.totalPages = totalPages;
    this.data = data;
    this.pageSize = pageSize;
  }
}
