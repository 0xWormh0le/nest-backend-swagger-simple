import { FindOptionsOrder } from 'typeorm';

export enum UserRole {
  Admin = 'admin',
  Normal = 'normal',
  Limited = 'limited',
}

export type PaginationQuery<Entity> = {
  rowCount?: number;
  page?: number;
  sort?: FindOptionsOrder<Entity>;
};
