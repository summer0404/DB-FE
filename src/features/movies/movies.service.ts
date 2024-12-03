import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { MOVIES_REPOSITORY } from "src/common/constants";
import { Movies } from "./movies.entity";
import { CreateMovies } from "./dtos/create.dtos";
import { UpdateMovies } from "./dtos/update.dtos";
import { NotContains } from "sequelize-typescript";
import { Transaction } from "sequelize";
import { Files } from "../files/files.entity";
import { Actors } from "../actors/actors.entity";
import { Directors } from "../directors/directors.entity";

@Injectable()
export class MoviesService {
  constructor(
    @Inject(MOVIES_REPOSITORY)
    private readonly moviesRepository: typeof Movies,
  ) {}
  async createMovie(createMovieDto, transaction: Transaction): Promise<Movies> {
    const createdMovie = await this.moviesRepository.create(createMovieDto, {
      transaction,
    });
    return createdMovie;
  }
  async updateMovie(updateMovieDto: UpdateMovies) {
    const isMovie = await this.moviesRepository.findByPk(updateMovieDto.id);
    if (!isMovie) {
      throw new NotFoundException("Không tìm thấy bộ phim phù hợp");
    }
    const updateData = await isMovie.update(updateMovieDto);
    return updateData;
  }
  async removeMovie(id: string) {
    const isMovie = await this.moviesRepository.findByPk(id);
    if (!isMovie) {
      throw new NotFoundException("Không tìm thấy bộ phim phù hợp");
    }
    const remove = await isMovie.destroy();
    return remove;
  }
  async getAll() {
    const allMovies = await this.moviesRepository.findAll();
    if (allMovies.length == 0) return [];
    return allMovies;
  }

  async getByIdTransaction(id: string, transaction: Transaction) {
    const isMovie = await this.moviesRepository.findByPk(id, {
      transaction,
      include: [
        {
          model: Files,
          as: "files",
        },
        {
          model: Actors,
          as: "actors",
        },
        {
          model: Directors,
          as: "directors",
        },
      ],
    });

    if (!isMovie) {
      throw new NotFoundException("Không tìm thấy bộ phim phù hợp");
    }
    return isMovie;
  }

  async getById(id: string) {
    const isMovie = await this.moviesRepository.findByPk(id);
    if (!isMovie) {
      throw new NotFoundException("Không tìm thấy bộ phim phù hợp");
    }
    return isMovie;
  }
}