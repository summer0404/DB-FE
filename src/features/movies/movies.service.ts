import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { MOVIES_REPOSITORY } from 'src/common/constants';
import { Movies } from './movies.entity';
import { CreateMovies } from './dtos/create.dtos';
import { UpdateMovies } from './dtos/update.dtos';
import { NotContains } from 'sequelize-typescript';

@Injectable()
export class MoviesService {
    constructor(
        @Inject(MOVIES_REPOSITORY)
        private readonly moviesRepository: typeof Movies
    ) { }
    async createMovie(createMovieDto: CreateMovies): Promise<CreateMovies> {
        const createdMovie = await this.moviesRepository.create(createMovieDto)
        return createdMovie
    }
    async updateMovie(updateMovieDto: UpdateMovies) {
        const isMovie = await this.moviesRepository.findByPk(updateMovieDto.id)
        if (!isMovie) {
            throw new NotFoundException("Không tìm thấy bộ phim phù hợp")
        }
        const updateData = await isMovie.update(updateMovieDto)
        return updateData
    }
    async removeMovie(id: string) {
        const isMovie = await this.moviesRepository.findByPk(id)
        if (!isMovie) {
            throw new NotFoundException("Không tìm thấy bộ phim phù hợp")
        }
        const remove = await isMovie.destroy()
        return remove
    }
    async getAll() {
        const allMovies = await this.moviesRepository.findAll()
        if (allMovies.length == 0) return []
        return allMovies
    }
    async getById(id:string) {
        const isMovie = await this.moviesRepository.findByPk(id)
        if (!isMovie) {
            throw new NotFoundException("Không tìm thấy bộ phim phù hợp")
        }
        return isMovie
    }
}
