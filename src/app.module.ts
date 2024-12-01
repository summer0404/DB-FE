import { Module } from '@nestjs/common';
import { DatabaseModule } from './config/database/database.module';
import { LoggerModule } from './features/logger/logger.module';
import { ResponseModule } from './features/response/response.module';
import { UsersModule } from './features/users/users.module';
import { StaffsModule } from './features/staffs/staffs.module';
import { CustomersModule } from './features/customers/customers.module';
import { CouponsModule } from './features/coupons/coupons.module';
import { FastfoodsModule } from './features/fastfoods/fastfoods.module';
import { OrdersModule } from './features/orders/orders.module';
import { BookModule } from './features/book/book.module';
import { TicketsModule } from './features/tickets/tickets.module';
import { FilesModule } from './features/files/files.module';
import { StorageModule } from './features/storage/storage.module';

@Module({
  imports: [
    DatabaseModule,
    LoggerModule,
    ResponseModule,
    UsersModule,
    StaffsModule,
    CustomersModule,
    CouponsModule,
    FastfoodsModule,
    OrdersModule,
    BookModule,
    TicketsModule,
    FilesModule,
    StorageModule,
  ],
})
export class AppModule {}
