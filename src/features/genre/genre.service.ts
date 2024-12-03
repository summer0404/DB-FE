import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { GENRE_REPOSITORY } from "src/common/constants";
import { Genre } from "./genre.entity";
import { CreateGenreDto } from "./dtos/create.dto";
import { UpdateGenreDto } from "./dtos/update.dto";
import { Transaction } from "sequelize";

@Injectable()
export class GenreService {
  constructor(
    @Inject(GENRE_REPOSITORY)
    private readonly genresRepository: typeof Genre,
  ) {}
  async create(createGenre: CreateGenreDto): Promise<CreateGenreDto> {
    const createdGenre = await this.genresRepository.create(createGenre);
    return createdGenre;
  }
  async createTransaction(createGenre, transaction: Transaction) {
    for (let i in createGenre) {
      const createdGenre = await this.genresRepository.create(createGenre[i], {
        transaction,
      });
    }
    return null;
  }
  async removeGenre(movieId: string, genre: string) {
    const isGenre = await this.genresRepository.findOne({
      where: {
        movieId: movieId,
        genre: genre,
      },
    });
    if (!isGenre) {
      throw new NotFoundException("Không tìm thấy thể loại phim phù hợp");
    }
    const remove = await isGenre.destroy();
    return remove;
  }
  async getAll() {
    const allGenres = await this.genresRepository.findAll();
    if (allGenres.length == 0) return [];
    return allGenres;
  }
  async getByIds(movieId: string, genreName: string) {
    const isGenre = await this.genresRepository.findOne({
      where: {
        movieId: movieId,
        genre: genreName,
      },
    });
    if (!isGenre) {
      throw new NotFoundException("Không tìm thấy thể loại phim phù hợp");
    }
    return isGenre;
  }
}
