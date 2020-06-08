export class PaginationService {
  private pages: number[];
  private readonly paginationLength: number;
  private currentPage: number;
  private totalPages: number;

  constructor(paginationLength: number, currentPage: any, totalPages) {
    this.paginationLength = paginationLength;
    this.currentPage = currentPage;
    this.totalPages = totalPages;
  }

  setCurrentPage(newPageNumber) {
    this.currentPage = newPageNumber;
  }

  getPages() {
    this.refreshPagination();
    return this.pages;
  }

  private refreshPagination(newPageNumber: number = this.currentPage,
                            paginationLength: number = this.paginationLength,
                            totalPages: number = this.totalPages) {
    let result = [];
    let paginationFlag = this.currentPage + paginationLength > totalPages + 1;
    let pageStart = newPageNumber;
    let pageEnd = paginationLength;

    if (totalPages < pageEnd) pageEnd = totalPages;

    if (pageStart > 1) {
      pageStart = newPageNumber - 1;
    }

    if (!paginationFlag) {
      for (let i = 0; i < pageEnd; i++) {
        result.push(pageStart + i);
      }
    } else {
      for (let i = 0; i < pageEnd; i++) {
        result.push(totalPages - i);
      }
      result = result.reverse();
    }

    this.pages = result;
  }

  setTotalPages(totalPages) {
    this.totalPages = totalPages;
  }
}
