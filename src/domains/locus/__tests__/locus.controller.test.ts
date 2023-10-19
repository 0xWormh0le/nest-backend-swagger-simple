import express from 'express';
import { Repository } from 'typeorm';
import { LocusController } from '../locus.controller';
import LocusService from '../locus.service';
import Locus from '../locus.entity';
import locus from './locus.json';
import locusMembers from './locusMembers.json';
import LocusRepositoryMock from './locusRepositoryMock';
import { UserRole } from '../../../types';
import LocusMember from '../locusMember.entity';

const mockData = {
  locus: locus as Locus[],
  locusMembers: locusMembers as unknown as LocusMember[],
};

describe('LocusController', () => {
  let controller: LocusController;

  beforeEach(async () => {
    const repository = new LocusRepositoryMock(mockData);
    const service = new LocusService(
      repository as unknown as Repository<Locus>,
    );
    controller = new LocusController(service);
  });

  it('test', async () => {
    const request = {
      query: {},
      user: { role: UserRole.Admin },
    };

    expect(
      await controller.findAll(request as unknown as express.Request),
    ).toEqual([]);
  });

  // todo: write test case here
});
