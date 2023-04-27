import { TOrder, TSort } from '../interfaces';

export class Url {
  currPage: number = 1;
  order: TOrder;
  sort: TSort | undefined;
  perPage: number;

  constructor(currPage: number, order: TOrder, perPage: number, sort: TSort = undefined) {
    this.currPage = currPage;
    this.order = order;
    this.perPage = perPage;
    this.sort = sort;
  }

  getUrl(type: 'prev' | 'next'): string {
    const baseUrl = 'http://localhost:3000/movies';

    switch (type) {
      case 'prev':
        this.currPage -= 1;
        break;
      case 'next':
        this.currPage += 1;
        break;
    }

    const perPageQuery: string = this.perPage ? `&perPage=${this.perPage}` : '';

    return `${baseUrl}?page=${this.currPage}${perPageQuery}`;
  }
}
