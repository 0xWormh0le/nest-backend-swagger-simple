import { PaginationQuery } from '../types';
import { FindManyOptions } from 'typeorm';

type Options<Entity> = Pick<FindManyOptions<Entity>, 'take' | 'skip' | 'order'>;

export default class Pagination<Entity> {
  info: PaginationQuery<Entity>;
  queryImpl: (options: Options<Entity>) => Promise<any>;

  paginate(info: PaginationQuery<Entity>) {
    this.info = info;
    return this;
  }

  async get() {
    const options = {
      take: this.info.rowCount ?? 1000,
      skip:
        this.info.page !== undefined && this.info.rowCount !== undefined
          ? this.info.page * this.info.rowCount
          : undefined,
      order: this.info.sort,
    };

    return await this.queryImpl(options);
  }
}
