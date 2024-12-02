import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateStaffDto } from './dto/createStaff.dto';
import { UpdateStaffDto } from './dto/updateStaff.dto';
import { STAFF_REPOSITORY } from 'src/common/constants';
import { Staffs } from './staffs.entity';
import { Transaction } from 'sequelize';

@Injectable()
export class StaffsService {
  constructor(
    @Inject(STAFF_REPOSITORY)
    private readonly staffRepository: typeof Staffs,
  ) {}

  async create(id: string, transaction: Transaction): Promise<Staffs> {
    return await this.staffRepository.create({ id }, { transaction });
  }

  async findAll(): Promise<Staffs[]> {
    return await this.staffRepository.findAll();
  }

  async findOne(id: string): Promise<Staffs> {
    return await this.staffRepository.findOne({ where: { id } });
  }

  async update(id: string, updateStaffDto: UpdateStaffDto) {
    const existingStaff = await this.staffRepository.findOne({
      where: { id },
    });

    if (!existingStaff)
      throw new BadRequestException('Không tồn tại nhân viên');

    const [numRecordUpdates, [updateRecordData]] =
      await this.staffRepository.update(updateStaffDto, {
        where: {
          id: id,
        },
        returning: true,
      });
    return numRecordUpdates > 0 ? updateRecordData : null;
  }

  async remove(id: string) {
    const customer = await this.staffRepository.findOne({ where: { id } });

    if (!customer)
      throw new BadRequestException('Không tồn tại khách hàng tương ứng');

    await this.staffRepository.destroy({ where: { id } });
  }

  async removeTransaction(id: string, transaction: Transaction) {
    const customer = await this.staffRepository.findOne({ where: { id } });

    if (!customer)
      throw new BadRequestException('Không tồn tại khách hàng tương ứng');

    await this.staffRepository.destroy({ where: { id }, transaction });
  }
}
