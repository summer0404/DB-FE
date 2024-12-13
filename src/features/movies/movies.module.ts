import { forwardRef, Module } from "@nestjs/common";
import { MoviesService } from "./movies.service";
import { MoviesController } from "./movies.controller";
import { MOVIES_REPOSITORY, SEQUELIZE } from "src/common/constants";
import { Movies } from "./movies.entity";
import { LoggerModule } from "../logger/logger.module";
import { ResponseModule } from "../response/response.module";
import { DatabaseModule } from "src/config/database/database.module";
import { FilesModule } from "../files/files.module";
import { StorageModule } from "../storage/storage.module";
import { ActorsModule } from "../actors/actors.module";
import { DirectorsModule } from "../directors/directors.module";
import { GenreModule } from "../genre/genre.module";
import { RoomsModule } from "../rooms/rooms.module";
import { ShowtimeModule } from "../showtime/showtime.module";

@Module({
  imports: [
    LoggerModule,
    ResponseModule,
    DatabaseModule,
    forwardRef(() => FilesModule),
    ActorsModule,
    DirectorsModule,
    GenreModule,
    RoomsModule,
    ShowtimeModule,
  ],
  providers: [
    MoviesService,
    {
      provide: MOVIES_REPOSITORY,
      useValue: Movies,
    },
  ],
  controllers: [MoviesController],
  exports: [MoviesService],
})
export class MoviesModule {}
