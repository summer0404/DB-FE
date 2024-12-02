import { Module } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import { CUSTOMER_REPOSITORY } from 'src/common/constants';
import { Customers } from './customers.entity';
import { LoggerModule } from '../logger/logger.module';
import { ResponseModule } from '../response/response.module';
import { DatabaseModule } from 'src/config/database/database.module';

@Module({
  controllers: [CustomersController],
  providers: [
    CustomersService,
    {
      provide: CUSTOMER_REPOSITORY,
      useValue: Customers,
    },
  ],
  exports: [CustomersService],
  imports: [LoggerModule, ResponseModule, DatabaseModule],
})
export class CustomersModule {}
