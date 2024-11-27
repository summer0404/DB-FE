import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './config/database/database.module';
import { LoggerModule } from './features/logger/logger.module';
import { ResponseModule } from './features/response/response.module';
import { ActorsModule } from './features/actors/actors.module';
import { MoviesModule } from './features/movies/movies.module';
import { CommentsModule } from './features/comments/comments.module';
import { DirectorsModule } from './features/directors/directors.module';
import { RoomsModule } from './features/rooms/rooms.module';
import { ShowtimeModule } from './features/showtime/showtime.module';
import { GenreModule } from './features/genre/genre.module';
import { RatesModule } from './features/rates/rates.module';
import { SeatsModule } from './features/seats/seats.module';

@Module({
  imports: [DatabaseModule, LoggerModule, ResponseModule, ActorsModule, MoviesModule, CommentsModule, DirectorsModule, RoomsModule, ShowtimeModule, GenreModule, RatesModule, SeatsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
