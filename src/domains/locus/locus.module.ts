import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import LocusService from './locus.service';
import Locus from './locus.entity';
import { LocusController } from './locus.controller';
import LocusMember from './locusMember.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Locus, LocusMember])],
  exports: [TypeOrmModule],
  providers: [LocusService],
  controllers: [LocusController],
})
export class LocusModule {}
