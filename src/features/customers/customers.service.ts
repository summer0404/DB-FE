import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { UpdateCustomerDto } from './dto/updateCustomer.dto';
import { CUSTOMER_REPOSITORY } from 'src/common/constants';
import { Customers } from './customers.entity';
import { CreateCustomerDto } from './dto/createCustomer.dto';

@Injectable()
export class CustomersService {
  constructor(
    @Inject(CUSTOMER_REPOSITORY)
    private readonly customerRepository: typeof Customers,
  ) {}

  async create(createCustomerDto: CreateCustomerDto): Promise<Customers> {
    const customer = await this.findOne(createCustomerDto.id);

    if (customer)
      throw new BadRequestException(
        `Khách hàng với id ${createCustomerDto.id} đã tồn tại`,
      );

    return await this.customerRepository.create(createCustomerDto);
  }

  async findAll(): Promise<Customers[]> {
    return await this.customerRepository.findAll();
  }

  async findOne(id: string): Promise<Customers> {
    return await this.customerRepository.findOne({ where: { id } });
  }

  async update(id: string, updateCustomerDto: UpdateCustomerDto) {
    const customer = await this.findOne(id);

    if (!customer)
      throw new BadRequestException('Không tồn tại khách hàng tương ứng');

    const [numRecordUpdates, [updateRecordData]] =
      await this.customerRepository.update(updateCustomerDto, {
        where: {
          id: id,
        },
        returning: true,
      });
    return numRecordUpdates > 0 ? updateRecordData : null;
  }

  async remove(id: string) {
    const customer = await this.findOne(id);

    if (!customer)
      throw new BadRequestException('Không tồn tại khách hàng tương ứng');

    await this.customerRepository.destroy({ where: { id } });
  }
}
