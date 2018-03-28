import {Component, OnInit} from '@angular/core';
import {Action, AppService} from '../shared/AppService';
import {User} from '../shared/User';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  users: User[];
  pagination: Paginatoin;
  currentPage: number;
  itemsPerPage: any;
  paginationLength: number;
  totalPages: number;
  pages: number[];

  constructor(private service: AppService) {
    this.service.itemsPerPageChangeEvent.subscribe((action: Action) => {
      this.controlPannelActionListener(action);
    });
  }

  ngOnInit() {
    this.currentPage = 1;
    this.itemsPerPage = 2;
    this.paginationLength = 6;

    this.pagination = new Paginatoin(
      this.itemsPerPage, this.paginationLength,
      this.service.users, this.currentPage);

    this.totalPages = this.pagination.totalPages;
    this.pages = this.pagination.pages;
    this.users = this.pagination.getUsers(this.currentPage, this.itemsPerPage);
    let action = new Action();
    action.actionEvent = 'new users';
    action.data = this.users;
    this.service.updateUsers(action);
  }

  setPage(newPageNumber?) {
    if (newPageNumber) this.currentPage = newPageNumber;

    this.users = this.pagination.getUsers(this.currentPage, this.itemsPerPage);
    this.pages = this.pagination.getPages(newPageNumber);

    let action = new Action();

    action.actionEvent = 'new users';
    action.data = this.users;

    this.service.updateUsers(action);
  }

  private controlPannelActionListener(action: Action) {
    let actionEvent: string = action.actionEvent;
    switch (actionEvent) {
      case 'new itemPerPage value':
        this.setItemPerPage(action.data);
        break;
    }
  }

  private setItemPerPage(itemPerPage: any) {
    this.itemsPerPage = itemPerPage;
    if (this.itemsPerPage == 'all') {
      this.currentPage = 1;
      this.itemsPerPage = itemPerPage;
      this.setPage();
    } else {
      this.itemsPerPage = itemPerPage;
      this.setPage();
    }
  }
}


class Paginatoin {
  totalPages: number;
  public pages: number[];
  private paginationLength: number;
  private users: User[];
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


  getPages(newPageNumber) {
    let result = this.pages;
    if (this.itemsPerPage.toString() == 'all') this.paginationLength = 1;
    if (this.totalPages < this.paginationLength) this.paginationLength = Math.ceil(this.totalPages / 2);

    const paginationCenter = this.pages[Math.ceil(this.paginationLength / 2)] - 1;
    const pageWayUp = newPageNumber > this.currentPage;
    this.currentPage = newPageNumber;


    let startPageNumber: number = this.getStartPageNumber(newPageNumber, pageWayUp, paginationCenter);
    let endPageNumber: number = this.getEndPageNumber(newPageNumber, pageWayUp, paginationCenter, startPageNumber);

    if (endPageNumber && startPageNumber) {
      result = [];
      for (let pageNumber = startPageNumber; pageNumber < endPageNumber + 1; pageNumber++) {
        result.push(pageNumber);
      }

      this.pages = result;
    }
    return result;
  }

  getUsers(currentPage: number, itemsPerPage: any): User[] {
    if (itemsPerPage == 'all') return this.users;
    else this.itemsPerPage = itemsPerPage;

    let begin: number = ((currentPage - 1) * parseInt(itemsPerPage)),
      end: number = begin + parseInt(itemsPerPage);

    return this.users.slice(begin, end);
  }

  private getEndPageNumber(newPageNumber, pageWayUp, paginationCenter, startPageNumber) {
    if (newPageNumber < 1 || newPageNumber > this.totalPages) return 0;
    if (newPageNumber === 1) return newPageNumber + this.paginationLength - 1;
    if (newPageNumber === this.totalPages) return newPageNumber;

    if (pageWayUp) {
      if (newPageNumber > paginationCenter) {
        const needAddNumbers = newPageNumber - paginationCenter;

        const result = this.pages[this.pages.length - 1] + needAddNumbers;

        if (result <= this.totalPages) {
          return result;
        }
      }
    } else {
      if (newPageNumber < paginationCenter) {
        const needRemvoeNumbers = newPageNumber - paginationCenter;

        let result: number;
        result = this.pages[this.pages.length - 1] + needRemvoeNumbers;

        if (result <= this.totalPages) return result;

        return startPageNumber + this.paginationLength - 1

      } else {
        return null;
      }
    }

  }

  private getStartPageNumber(newPageNumber, pageWayUp, paginationCenter) {
    let result = 0;
    if (newPageNumber < 1 || newPageNumber > this.totalPages) return 0;
    if (newPageNumber === 1) return newPageNumber;
    if (newPageNumber === this.totalPages) return newPageNumber - this.paginationLength + 1;

    if (pageWayUp) {

      if (newPageNumber > paginationCenter) {
        const needAddNumbers = newPageNumber - paginationCenter;

        result = this.pages[this.pages.length - 1] + needAddNumbers;

        if (result <= this.totalPages) {

          return result - this.paginationLength + 1;
        }
      }
      return null;
    } else {

      if (newPageNumber < paginationCenter) {
        const needRemoveNumbers = paginationCenter - newPageNumber;

        result = this.pages[0] - needRemoveNumbers;

        if (result > 0) {

          return result;
        } else {
          return null;
        }
      } else {
        return null;
      }

    }

  }

  private initPages() {
    const result = [];

    if (this.totalPages < this.paginationLength) {
      this.paginationLength = Math.ceil(this.totalPages / 2);
    }

    for (let pageNumber = this.currentPage; pageNumber < this.paginationLength + 1; pageNumber++) {
      result.push(pageNumber);
    }

    return result;
  }
}
