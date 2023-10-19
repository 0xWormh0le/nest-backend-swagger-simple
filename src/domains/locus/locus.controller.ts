import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import LocusService from './locus.service';
import { UserRole } from '../../types';
import {
  parseSort,
  validateNumber,
  validateString,
} from '../../utils/validateQuery';
import { AuthGuard } from '../../auth/auth.guard';
import { Request } from 'express';

@ApiBearerAuth()
@ApiTags('locus')
@Controller('locus')
export class LocusController {
  constructor(private readonly locusService: LocusService) {}

  @Get()
  @UseGuards(AuthGuard)
  @ApiOperation({
    description: `Get locus list based on provided query param below.<br/>
    Permission:<br/>
    <b>admin</b> can access all columns,<br/>
    <b>normal</b> can access only data from rl table and cannot use sideloading,</br>
    <b>limited</b> user can get data only for regionId in (86118093,86696489,88186467)`,
  })
  @ApiQuery({ name: 'id', required: false, type: 'number' })
  @ApiQuery({ name: 'regionId', required: false, type: 'number' })
  @ApiQuery({ name: 'assemblyId', required: false, type: 'string' })
  @ApiQuery({ name: 'membershipStatus', required: false, type: 'string' })
  @ApiQuery({
    name: 'loadMembers',
    enum: [1, 0],
    required: false,
    description:
      'whether to sideload locus members. meaningless if user role is "normal"',
  })
  @ApiQuery({
    name: 'rowCount',
    type: 'string',
    required: false,
    description: 'response row count. if missing, default to 1000',
  })
  @ApiQuery({
    name: 'page',
    type: 'string',
    required: false,
    description: 'page number',
  })
  @ApiQuery({
    name: 'sort',
    type: 'string',
    required: false,
    description: 'comma separated sort fields',
    example: 'assemblyId:desc,locusMembers.regionId:asc,',
  })
  @ApiResponse({
    description:
      'rnc_locus list.</br>locus_members list is attached to each locus if loadMembers is 1 and user role is not manager',
  })
  async findAll(@Req() request: Request) {
    const {
      id,
      regionId,
      assemblyId,
      membershipStatus,
      rowCount,
      loadMembers,
      page,
      sort,
    } = request.query;

    const role = request['user']['role'];

    const filter = {
      id: validateNumber(id),
      regionIds: regionId ? [Number(regionId)] : undefined,
      assemblyId: validateString(assemblyId),
      membershipStatus: validateString(membershipStatus),
      loadMembers: loadMembers === '1',
    };

    if (role === UserRole.Normal) {
      filter.loadMembers = false;
    } else if (role === UserRole.Limited) {
      const regionIdLimited = [86118093, 86696489, 88186467];

      filter.regionIds = filter.regionIds
        ? filter.regionIds.filter((rid) => regionIdLimited.includes(rid))
        : regionIdLimited;
    }

    const data = await this.locusService
      .findAll(filter)
      .paginate({
        rowCount: validateNumber(rowCount),
        page: validateNumber(page),
        sort: parseSort(sort),
      })
      .get();

    return data;
  }
}
