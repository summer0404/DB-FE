import { Module } from '@nestjs/common';
import { SeatsService } from './seats.service';
import { SeatsController } from './seats.controller';
import { SEATS_REPOSITORY } from 'src/common/constants';
import { Seats } from './seats.entity';
import { LoggerModule } from '../logger/logger.module';
import { ResponseModule } from '../response/response.module';

@Module({
    imports:[LoggerModule, ResponseModule],
  providers: [SeatsService, {
    provide: SEATS_REPOSITORY,
    useValue: Seats
  }],
  controllers: [SeatsController]
})
export class SeatsModule {}
