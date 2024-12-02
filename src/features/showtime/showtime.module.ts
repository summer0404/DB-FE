import { Module } from '@nestjs/common';
import { ShowtimeService } from './showtime.service';
import { ShowtimeController } from './showtime.controller';
import { SHOWTIMES_REPOSITORY } from 'src/common/constants';
import { Showtime } from './showtime.entity';
import { LoggerModule } from '../logger/logger.module';
import { ResponseModule } from '../response/response.module';

@Module({
    imports:[LoggerModule, ResponseModule],
  providers: [ShowtimeService, {
    provide: SHOWTIMES_REPOSITORY,
    useValue: Showtime
  }],
  controllers: [ShowtimeController]
})
export class ShowtimeModule {}
