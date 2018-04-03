import {User} from '../shared/User';

export class Paginatoin {
  totalPages: number;
  public pages: number[];
  users: User[];
  private paginationLength: number;
  private currentPage: number;
  private itemsPerPage: number;

  constructor(itemPerPage: number, paginationLength: number, users: User[], currentPage: any) {
    this.itemsPerPage = itemPerPage;
    this.paginationLength = paginationLength;
    this.users = users;
    this.currentPage = currentPage;
    this.totalPages = Math.ceil(this.users.length / this.itemsPerPage);
    this.pages = this.initPages();
  }


  setItemPerPage(itemPerPage: number) {
    this.itemsPerPage = itemPerPage;
    this.totalPages = Math.ceil(this.users.length / this.itemsPerPage);
    this.pages = this.initPages();
  }

  getUsers(newPageNumber: number, itemsPerPage: any): User[] {
    this.itemsPerPage = itemsPerPage;
    this.pages = this.updatePages(newPageNumber);

    if (itemsPerPage == 'all') return this.users;

    let begin: number = ((this.currentPage - 1) * parseInt(itemsPerPage)),
      end: number = begin + parseInt(itemsPerPage);

    return this.users.slice(begin, end);
  }

  setUsers(users: User[]) {
    this.users = users;
    this.totalPages = Math.ceil(this.users.length / this.itemsPerPage);
    this.initPages()
  }

  getCurrentPage() {
    return this.currentPage;
  }

  private getStartPageNumber(newPageNumber, pageWayUp, paginationCenter) {
    let result = 0;
    if (newPageNumber < 1 || newPageNumber > this.totalPages) return 0;
    if (newPageNumber === 1) return newPageNumber;
    if (newPageNumber >= this.totalPages) return newPageNumber - this.paginationLength + 1;

    if (pageWayUp) {

      if (newPageNumber > paginationCenter) {
        const needAddNumbers = newPageNumber - paginationCenter;

        result = this.pages[0] + needAddNumbers;

        if (result > this.totalPages - this.paginationLength + 1) {

          return this.totalPages - this.paginationLength + 1;
        }
      }
      return result;
    } else {

      if (newPageNumber < paginationCenter) {
        const needRemoveNumbers = paginationCenter - newPageNumber;

        result = this.pages[0] - needRemoveNumbers;

        if (result > 0) {

          return result;
        } else {

          if (result == 0) return 1;
          return null;
        }
      } else {
        return null;
      }

    }

  }

  private initPages() {
    this.currentPage = 1;
    const result = [];

    if (this.totalPages < this.paginationLength) {
      this.paginationLength = this.totalPages;
    }

    for (let pageNumber = this.currentPage; pageNumber < this.paginationLength + 1; pageNumber++) {
      result.push(pageNumber);
    }

    this.pages = result;
    return result;
  }

  getPages() {
    return this.pages;
  }

  getTotalPage() {
    return this.totalPages;
  }

  getPaginationLength() {
    return this.paginationLength;
  }

  private updatePages(newPageNumber) {
    let result = this.pages;
    if (this.itemsPerPage.toString() == 'all') return [1];
    this.totalPages = Math.ceil(this.users.length / this.itemsPerPage);
    if (this.totalPages < this.paginationLength) this.paginationLength = Math.ceil(this.totalPages / 2);

    const paginationCenter = this.pages[Math.ceil(this.paginationLength / 2)] - 1;
    const pageWayUp = newPageNumber > this.currentPage;
    if (newPageNumber > this.paginationLength) {
      this.currentPage = this.paginationLength;
    } else {
      this.currentPage = newPageNumber;
    }


    let startPageNumber: number = this.getStartPageNumber(newPageNumber, pageWayUp, paginationCenter);
    let endPageNumber: number = startPageNumber + this.paginationLength - 1;

    if (endPageNumber && startPageNumber) {
      result = [];
      for (let pageNumber = startPageNumber; pageNumber < endPageNumber + 1; pageNumber++) {
        result.push(pageNumber);
      }

      this.pages = result;
    }


    let lastPageNumber = this.pages[this.pages.length - 1];
    if (this.currentPage > lastPageNumber) {
      this.currentPage = lastPageNumber;
    }

    return result;
  }
}
