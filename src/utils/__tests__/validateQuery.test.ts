import { parseSort } from '../validateQuery';

describe('validateQuery', () => {
  it('parseSort', () => {
    expect(
      parseSort('strand:asc,locusMembers.regionId:desc,locusStart:desc'),
    ).toEqual({
      strand: 'asc',
      locusMembers: {
        regionId: 'desc',
      },
      locusStart: 'desc',
    });
  });
});
