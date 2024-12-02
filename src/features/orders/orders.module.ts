import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { LoggerModule } from '../logger/logger.module';
import { ResponseModule } from '../response/response.module';
import { ORDER_REPOSITORY } from 'src/common/constants';
import { Orders } from './orders.entity';

@Module({
  controllers: [OrdersController],
  providers: [
    OrdersService,
    {
      provide: ORDER_REPOSITORY,
      useValue: Orders,
    },
  ],
  exports: [OrdersService],
  imports: [LoggerModule, ResponseModule],
})
export class OrdersModule {}
