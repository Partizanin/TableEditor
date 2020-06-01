export class PaginationService {
  private pages: number[];
  private readonly paginationLength: number;
  private currentPage: number;
  private totalPages: number;

  constructor(paginationLength: number, currentPage: any, totalPages) {
    this.paginationLength = paginationLength;
    this.currentPage = currentPage;
    this.totalPages = totalPages;
    this.refreshPagination(1)
  }

  setCurrentPage(newPageNumber) {
    this.currentPage = newPageNumber;
    this.refreshPagination();
  }

  getPages() {
    return this.pages;
  }

  private refreshPagination(newPageNumber: number = this.currentPage,
                            paginationLength: number = this.paginationLength,
                            totalPages: number = this.totalPages) {
    let result = [];
    // if (this.itemsPerPage.toString() == 'all') this.pages = [1]; todo:fix

    let paginationFlag = this.currentPage + paginationLength > totalPages + 1;

    let pageStart = newPageNumber;

    if (pageStart > 1) {
      pageStart = newPageNumber - 1;
    }

    if (!paginationFlag) {
      for (let i = 0; i < paginationLength; i++) {
        result.push(pageStart + i);
      }
    } else {
      for (let i = 0; i < paginationLength; i++) {
        result.push(totalPages - i);
      }
      result = result.reverse();
    }

    this.pages = result;
  }
}
