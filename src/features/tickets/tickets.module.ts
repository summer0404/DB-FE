import { Module } from "@nestjs/common";
import { TicketsService } from "./tickets.service";
import { TicketsController } from "./tickets.controller";
import { LoggerModule } from "../logger/logger.module";
import { ResponseModule } from "../response/response.module";
import { TICKET_REPOSITORY } from "src/common/constants";
import { Tickets } from "./tickets.entity";
import { ShowtimeModule } from "../showtime/showtime.module";

@Module({
  controllers: [TicketsController],
  providers: [
    TicketsService,
    {
      provide: TICKET_REPOSITORY,
      useValue: Tickets,
    },
  ],
  imports: [LoggerModule, ResponseModule, ShowtimeModule],
  exports: [TicketsService],
})
export class TicketsModule {}
