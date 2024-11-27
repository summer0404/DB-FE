import { Module } from '@nestjs/common';
import { GenreService } from './genre.service';
import { GenreController } from './genre.controller';
import { GENRE_REPOSITORY } from 'src/common/constants';
import { Genre } from './genre.entity';
import { LoggerModule } from '../logger/logger.module';
import { ResponseModule } from '../response/response.module';

@Module({
    imports:[LoggerModule, ResponseModule],
  providers: [GenreService, {
    provide: GENRE_REPOSITORY,
    useValue: Genre
  }],
  controllers: [GenreController]
})
export class GenreModule {}
