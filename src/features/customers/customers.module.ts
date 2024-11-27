import { Module } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import { CUSTOMER_REPOSITORY } from 'src/common/constants';
import { Customers } from './customers.entity';

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
})
export class CustomersModule {}
