import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { Users } from './users.entity';
import { USER_REPOSITORY } from 'src/common/constants';
import { LoggerModule } from '../logger/logger.module';
import { LoggerService } from '../logger/logger.service';
import { ResponseModule } from '../response/response.module';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      provide: USER_REPOSITORY,
      useValue: Users,
    },
  ],
  exports: [UsersService],
  imports: [LoggerModule, ResponseModule],
})
export class UsersModule {}
