import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { MOVIES_REPOSITORY } from 'src/common/constants';
import { Movies } from './movies.entity';
import { LoggerModule } from '../logger/logger.module';
import { ResponseModule } from '../response/response.module';

@Module({
    imports:[LoggerModule, ResponseModule],
  providers: [MoviesService, {
    provide: MOVIES_REPOSITORY,
    useValue: Movies
  }],
  controllers: [MoviesController]
})
export class MoviesModule {}
