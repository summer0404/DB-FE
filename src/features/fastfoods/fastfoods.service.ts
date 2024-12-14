import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { FASTFOOD_REPOSITORY } from "src/common/constants";
import { Fastfoods } from "./fastfoods.entity";
import { Transaction } from "sequelize";
import { Files } from "../files/files.entity";

@Injectable()
export class FastfoodsService {
  constructor(
    @Inject(FASTFOOD_REPOSITORY)
    private readonly fastfoodRepository: typeof Fastfoods,
  ) {}

  async create(createFastfoodDto): Promise<Fastfoods> {
    const exitsingFastfood = await this.fastfoodRepository.findOne({
      where: { name: createFastfoodDto.name },
    });

    if (exitsingFastfood)
      throw new BadRequestException("Tên thức ăn nhanh đã tồn tại");

    return await this.fastfoodRepository.create(createFastfoodDto);
  }

  async createTransaction(
    createFastfoodDto,
    transaction: Transaction,
  ): Promise<Fastfoods> {
    const exitsingFastfood = await this.fastfoodRepository.findOne({
      where: { name: createFastfoodDto.name },
    });

    if (exitsingFastfood)
      throw new BadRequestException("Tên thức ăn nhanh đã tồn tại");

    return await this.fastfoodRepository.create(createFastfoodDto, {
      transaction,
    });
  }

  async findAll(): Promise<Fastfoods[]> {
    return await this.fastfoodRepository.findAll({
      include: [
        {
          model: Files,
          as: "file",
        },
      ],
    });
  }

  async findOne(id: string): Promise<Fastfoods> {
    return await this.fastfoodRepository.findByPk(id, {
      include: [
        {
          model: Files,
          as: "file",
        },
      ],
    });
  }

  async findOneTransaction(
    id: string,
    transaction: Transaction,
  ): Promise<Fastfoods> {
    return await this.fastfoodRepository.findByPk(id, {
      include: [
        {
          model: Files,
          as: "file",
        },
      ],
      transaction,
    });
  }

  async update(id: string, updateFastfoodDto): Promise<Fastfoods> {
    const existingFastfood = await this.fastfoodRepository.findByPk(id);

    if (!existingFastfood)
      throw new BadRequestException("Không tồn tại thức ăn nhanh");

    const [numRecordUpdates, [updateRecordData]] =
      await this.fastfoodRepository.update(updateFastfoodDto, {
        where: {
          id: id,
        },
        returning: true,
      });
    return numRecordUpdates > 0 ? updateRecordData : null;
  }

  async updateTransaction(
    id: string,
    updateFastfoodDto,
    transaction: Transaction,
  ): Promise<Fastfoods> {
    const existingFastfood = await this.fastfoodRepository.findByPk(id);

    if (!existingFastfood)
      throw new BadRequestException("Không tồn tại thức ăn nhanh");

    const [numRecordUpdates, [updateRecordData]] =
      await this.fastfoodRepository.update(updateFastfoodDto, {
        where: {
          id: id,
        },
        transaction,
        returning: true,
      });
    return numRecordUpdates > 0 ? updateRecordData : null;
  }

  async remove(id: string) {
    const existingFastfood = await this.fastfoodRepository.findByPk(id);

    if (!existingFastfood)
      throw new BadRequestException("Không tồn tại thức ăn nhanh tương ứng");

    await this.fastfoodRepository.destroy({ where: { id } });
  }
}
