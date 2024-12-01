import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { UpdateCustomerDto } from './dto/updateCustomer.dto';
import { CUSTOMER_REPOSITORY } from 'src/common/constants';
import { Customers } from './customers.entity';
import { CreateCustomerDto } from './dto/createCustomer.dto';
import { Transaction } from 'sequelize';

@Injectable()
export class CustomersService {
  constructor(
    @Inject(CUSTOMER_REPOSITORY)
    private readonly customerRepository: typeof Customers,
  ) {}

  async create(id: string, transaction: Transaction): Promise<Customers> {
    return await this.customerRepository.create({ id }, { transaction });
  }

  async findAll(): Promise<Customers[]> {
    return await this.customerRepository.findAll();
  }

  async findOne(id: string): Promise<Customers> {
    return await this.customerRepository.findOne({ where: { id } });
  }

  async update(
    id: string,
    updateCustomerDto: UpdateCustomerDto,
    transaction: Transaction,
  ) {
    const existingcustomer = await this.customerRepository.findOne({
      where: { id },
    });

    if (!existingcustomer)
      throw new BadRequestException('Không tồn tại khách hàng');

    const [numRecordUpdates, [updateRecordData]] =
      await this.customerRepository.update(updateCustomerDto, {
        where: {
          id: id,
        },
        returning: true,
        transaction,
      });
    return numRecordUpdates > 0 ? updateRecordData : null;
  }

  async remove(id: string) {
    const customer = await this.customerRepository.findOne({ where: { id } });

    if (!customer)
      throw new BadRequestException('Không tồn tại khách hàng tương ứng');

    await this.customerRepository.destroy({ where: { id } });
  }

  async removeTransaction(id: string, transaction: Transaction) {
    const customer = await this.customerRepository.findOne({ where: { id } });

    if (!customer)
      throw new BadRequestException('Không tồn tại khách hàng tương ứng');

    await this.customerRepository.destroy({ where: { id }, transaction });
  }
}
