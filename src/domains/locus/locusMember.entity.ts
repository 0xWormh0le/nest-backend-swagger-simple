import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import Locus from './locus.entity';

@Entity({ name: 'rnc_locus_members' })
export default class LocusMember {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'region_id' })
  regionId: number;

  @Column({ name: 'membership_status' })
  membershipStatus: string;

  @ManyToOne(() => Locus, (locus) => locus.locusMembers)
  @JoinColumn({ name: 'locus_id' })
  locus: Locus;
}
