import { Module } from "@nestjs/common";
import { ActorsController } from "./actors.controller";
import { ActorsService } from "./actors.service";
import { ACTORS_REPOSITORY } from "src/common/constants";
import { Actors } from "./actors.entity";
import { LoggerModule } from "../logger/logger.module";
import { ResponseModule } from "../response/response.module";

@Module({
  imports: [LoggerModule, ResponseModule],
  controllers: [ActorsController],
  providers: [
    ActorsService,
    {
      provide: ACTORS_REPOSITORY,
      useValue: Actors,
    },
  ],
  exports: [ActorsService],
})
export class ActorsModule {}
