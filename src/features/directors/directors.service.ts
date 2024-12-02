import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { DIRECTORS_REPOSITORY } from "src/common/constants";
import { Directors } from "./directors.entity";
import { createDirectors } from "./dtos/create.dto";
import { updateDirectors } from "./dtos/update.dto";
import { Transaction } from "sequelize";

@Injectable()
export class DirectorsService {
  constructor(
    @Inject(DIRECTORS_REPOSITORY)
    private readonly directorsRepository: typeof Directors,
  ) {}
  async create(createDirector: createDirectors): Promise<createDirectors> {
    const createdDirector =
      await this.directorsRepository.create(createDirector);
    return createdDirector;
  }
  async createTransaction(
    createDirector,
    transaction: Transaction,
  ): Promise<createDirectors> {
    for (let i in createDirector) {
      const createdDirector = await this.directorsRepository.create(
        createDirector[i],
        { transaction },
      );
    }

    return null;
  }
  async updateDirector(updateDirectorDto: updateDirectors) {
    const isDirector = await this.directorsRepository.findByPk(
      updateDirectorDto.id,
    );
    if (!isDirector) {
      throw new NotFoundException("Không tìm thấy đạo diễn phù hợp");
    }
    const updateData = await isDirector.update(updateDirectorDto);
    return updateData;
  }
  async removeDirector(movieId: string, id: string) {
    const isDirector = await this.directorsRepository.findOne({
      where: {
        id: id,
        movieId: movieId,
      },
    });
    if (!isDirector) {
      throw new NotFoundException("Không tìm thấy đạo diễn phù hợp");
    }
    const remove = await isDirector.destroy();
    return remove;
  }
  async getAll() {
    const allDirectors = await this.directorsRepository.findAll();
    if (allDirectors.length == 0) return [];
    return allDirectors;
  }
  async getByIds(movieId: string, id: string) {
    const isDirector = await this.directorsRepository.findOne({
      where: {
        id: id,
        movieId: movieId,
      },
    });
    if (!isDirector) {
      throw new NotFoundException("Không tìm thấy đạo diễn phù hợp");
    }
    return isDirector;
  }
}
