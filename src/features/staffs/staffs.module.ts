import { Module } from '@nestjs/common';
import { StaffsService } from './staffs.service';
import { StaffsController } from './staffs.controller';
import { LoggerModule } from '../logger/logger.module';
import { ResponseModule } from '../response/response.module';
import { STAFF_REPOSITORY } from 'src/common/constants';
import { Staffs } from './staffs.entity';

@Module({
  controllers: [StaffsController],
  providers: [
    StaffsService,
    {
      provide: STAFF_REPOSITORY,
      useValue: Staffs,
    },
  ],
  exports: [StaffsService],
  imports: [LoggerModule, ResponseModule],
})
export class StaffsModule {}
