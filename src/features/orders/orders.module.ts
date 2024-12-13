import { Module } from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { OrdersController } from "./orders.controller";
import { LoggerModule } from "../logger/logger.module";
import { ResponseModule } from "../response/response.module";
import { ORDER_REPOSITORY } from "src/common/constants";
import { Orders } from "./orders.entity";
import { DatabaseModule } from "src/config/database/database.module";
import { CouponsModule } from "../coupons/coupons.module";
import { UsersModule } from "../users/users.module";
import { TicketsModule } from "../tickets/tickets.module";
import { BookModule } from "../book/book.module";

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
  imports: [
    LoggerModule,
    ResponseModule,
    DatabaseModule,
    CouponsModule,
    UsersModule,
    TicketsModule,
    BookModule,
  ],
})
export class OrdersModule {}
