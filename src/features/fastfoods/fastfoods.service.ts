import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateFastfoodDto } from './dto/createFastfood.dto';
import { UpdateFastfoodDto } from './dto/updateFastfood.dto';
import { FASTFOOD_REPOSITORY } from 'src/common/constants';
import { Fastfoods } from './fastfoods.entity';

@Injectable()
export class FastfoodsService {
  constructor(
    @Inject(FASTFOOD_REPOSITORY)
    private readonly fastfoodRepository: typeof Fastfoods,
  ) {}

  async create(createFastfoodDto: CreateFastfoodDto): Promise<Fastfoods> {
    const exitsingFastfood = await this.fastfoodRepository.findOne({
      where: { name: createFastfoodDto.name },
    });

    if (exitsingFastfood)
      throw new BadRequestException('Tên thức ăn nhanh đã tồn tại');

    return await this.fastfoodRepository.create(createFastfoodDto);
  }

  async findAll(): Promise<Fastfoods[]> {
    return await this.fastfoodRepository.findAll();
  }

  async findOne(id: string): Promise<Fastfoods> {
    return await this.fastfoodRepository.findByPk(id);
  }

  async update(
    id: string,
    updateFastfoodDto: UpdateFastfoodDto,
  ): Promise<Fastfoods> {
    const existingFastfood = await this.fastfoodRepository.findByPk(id);

    if (!existingFastfood)
      throw new BadRequestException('Không tồn tại thức ăn nhanh');

    const [numRecordUpdates, [updateRecordData]] =
      await this.fastfoodRepository.update(updateFastfoodDto, {
        where: {
          id: id,
        },
        returning: true,
      });
    return numRecordUpdates > 0 ? updateRecordData : null;
  }

  async remove(id: string) {
    const existingFastfood = await this.fastfoodRepository.findByPk(id);

    if (!existingFastfood)
      throw new BadRequestException('Không tồn tại thức ăn nhanh tương ứng');

    await this.fastfoodRepository.destroy({ where: { id } });
  }
}
