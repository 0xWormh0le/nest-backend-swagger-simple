import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import Locus from './locus.entity';
import LocusMember from './locusMember.entity';
import Pagination from '../../utils/pagination';

export type QueryInfo = Partial<
  Pick<Locus, 'id' | 'assemblyId'> &
    Pick<LocusMember, 'membershipStatus'> & {
      loadMembers?: boolean;
      regionIds?: number[];
    }
>;

@Injectable()
export default class LocusService extends Pagination<Locus> {
  constructor(
    @InjectRepository(Locus)
    private locusRepository: Repository<Locus>,
  ) {
    super();
  }

  findAll({
    id,
    assemblyId,
    membershipStatus,
    regionIds,
    loadMembers,
  }: QueryInfo) {
    this.queryImpl = async (options) => {
      const data = await this.locusRepository.find({
        where: {
          id,
          assemblyId,
          locusMembers: {
            membershipStatus,
            regionId: regionIds ? In(regionIds) : undefined,
          },
        },
        relations: {
          locusMembers: true,
        },
        ...options,
      });

      if (!loadMembers) {
        return data.map((locus: Locus) => {
          delete locus.locusMembers;
          return locus;
        });
      }

      return data;
    };

    return this;
  }
}
