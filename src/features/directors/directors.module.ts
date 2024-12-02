import { Module } from "@nestjs/common";
import { DirectorsService } from "./directors.service";
import { DirectorsController } from "./directors.controller";
import { DIRECTORS_REPOSITORY } from "src/common/constants";
import { Directors } from "./directors.entity";
import { LoggerModule } from "../logger/logger.module";
import { ResponseModule } from "../response/response.module";

@Module({
  imports: [LoggerModule, ResponseModule],
  providers: [
    DirectorsService,
    {
      provide: DIRECTORS_REPOSITORY,
      useValue: Directors,
    },
  ],
  controllers: [DirectorsController],
  exports: [DirectorsService],
})
export class DirectorsModule {}
