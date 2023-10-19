import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import config from './config';
import Locus from './domains/locus/locus.entity';
import { LocusModule } from './domains/locus/locus.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: config.db.hostname,
      port: config.db.port,
      username: config.db.user,
      password: config.db.password,
      database: config.db.database,
      entities: [Locus],
      autoLoadEntities: true,
    }),
    AuthModule,
    LocusModule,
  ],
})
export class AppModule {}
