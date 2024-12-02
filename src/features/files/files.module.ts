import { forwardRef, Module } from "@nestjs/common";
import { FilesService } from "./files.service";
import { FilesController } from "./files.controller";
import { UsersModule } from "../users/users.module";
import { StorageModule } from "../storage/storage.module";
import { FILE_REPOSITORY } from "src/common/constants";
import { Files } from "./files.entity";
import { MoviesModule } from "../movies/movies.module";
import { DatabaseModule } from "src/config/database/database.module";
import { LoggerModule } from "../logger/logger.module";
import { ResponseModule } from "../response/response.module";

@Module({
  imports: [
    UsersModule,
    forwardRef(() => MoviesModule),
    StorageModule,
    DatabaseModule,
    LoggerModule,
    ResponseModule,
  ],
  controllers: [FilesController],
  providers: [
    FilesService,
    {
      provide: FILE_REPOSITORY,
      useValue: Files,
    },
  ],
  exports: [FilesService],
})
export class FilesModule {}
