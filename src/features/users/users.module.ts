import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { Users } from './users.entity';
import { USER_REPOSITORY } from 'src/common/constants';
import { LoggerModule } from '../logger/logger.module';
import { ResponseModule } from '../response/response.module';
import { CustomersModule } from '../customers/customers.module';
import { StaffsModule } from '../staffs/staffs.module';
import { DatabaseModule } from 'src/config/database/database.module';

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
  imports: [
    LoggerModule,
    ResponseModule,
    CustomersModule,
    StaffsModule,
    DatabaseModule,
  ],
})
export class UsersModule {}
