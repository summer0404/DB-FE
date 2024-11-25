import { Inject, Injectable } from '@nestjs/common';
import { MOVIES_REPOSITORY } from 'src/common/constants';
import { Movies } from './movies.entity';
import { CreateMovies } from './dtos/create.dtos';

@Injectable()
export class MoviesService {
    constructor(
        @Inject(MOVIES_REPOSITORY)
        private readonly moviesRepository: typeof Movies
    ) { }
    async createMovie ( createMovieDto: CreateMovies): Promise <CreateMovies> {
        const createdMovie = this.moviesRepository.create(createMovieDto)
        return createdMovie
    }
}
