import { Module } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { RoomsController } from './rooms.controller';
import { LoggerModule } from '../logger/logger.module';
import { ResponseModule } from '../response/response.module';
import { ROOMS_REPOSITORY } from 'src/common/constants';
import { Rooms } from './rooms.entity';

@Module({
    imports:[LoggerModule, ResponseModule],
  providers: [RoomsService, {
    provide:ROOMS_REPOSITORY,
    useValue: Rooms
  }],
  controllers: [RoomsController]
})
export class RoomsModule {}
