import { Entity, Column, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import LocusMember from './locusMember.entity';

@Entity({ name: 'rnc_locus' })
export default class Locus {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'assembly_id' })
  assemblyId: string;

  @Column({ name: 'locus_name' })
  locusName: string;

  @Column({ name: 'public_locus_name' })
  publicLocusName: string;

  @Column({ name: 'chromosome' })
  chromosome: string;

  @Column({ name: 'strand' })
  strand: string;

  @Column({ name: 'locus_start' })
  locusStart: number;

  @Column({ name: 'locus_stop' })
  locusStop: number;

  @Column({ name: 'member_count' })
  memberCount: number;

  @OneToMany(() => LocusMember, (locusMember) => locusMember.locus)
  locusMembers: LocusMember[];
}
