import Locus from '../locus.entity';
import LocusMember from '../locusMember.entity';

export default class LocusRepositoryMock {
  constructor(
    private mockData: { locus: Locus[]; locusMembers: LocusMember[] },
  ) {}

  find() {
    // todo: write find logic here
    return [];
  }
}
