import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { UpdateOrderDto } from "./dto/updateOrder.dto";
import { ORDER_REPOSITORY } from "src/common/constants";
import { Orders } from "./orders.entity";
import { CreateOrderDto } from "./dto/createOrder.dto";
import { Transaction } from "sequelize";

@Injectable()
export class OrdersService {
  constructor(
    @Inject(ORDER_REPOSITORY)
    private readonly orderRepository: typeof Orders,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Orders> {
    return await this.orderRepository.create(createOrderDto);
  }

  async createTransaction(
    createOrderDto: CreateOrderDto,
    transaction: Transaction,
  ): Promise<Orders> {
    return await this.orderRepository.create(createOrderDto);
  }

  async findAll(): Promise<Orders[]> {
    return await this.orderRepository.findAll();
  }

  async findOne(id: string) {
    const existingOrder = await this.orderRepository.findByPk(id);

    if (!existingOrder)
      throw new BadRequestException("Không tồn tại đơn hàng tương ứng");

    return existingOrder;
  }

  async findOneToCheck(id: string) {
    return await this.orderRepository.findByPk(id);
  }

  async findOneTransaction(id: string, transaction: Transaction) {
    const existingOrder = await this.orderRepository.findByPk(id, {
      transaction,
    });

    if (!existingOrder)
      throw new BadRequestException("Không tồn tại đơn hàng tương ứng");

    return existingOrder;
  }

  async update(id: string, updateOrderDto: UpdateOrderDto): Promise<Orders> {
    const existingOrder = await this.orderRepository.findByPk(id);

    if (!existingOrder) throw new BadRequestException("Không tồn tại đơn hàng");

    const [numRecordUpdates, [updateRecordData]] =
      await this.orderRepository.update(updateOrderDto, {
        where: {
          id: id,
        },
        returning: true,
      });
    return numRecordUpdates > 0 ? updateRecordData : null;
  }

  async updateTransaction(
    id: string,
    updateOrderDto: UpdateOrderDto,
    transaction: Transaction,
  ): Promise<Orders> {
    const existingOrder = await this.orderRepository.findByPk(id);

    if (!existingOrder) throw new BadRequestException("Không tồn tại đơn hàng");

    const [numRecordUpdates, [updateRecordData]] =
      await this.orderRepository.update(updateOrderDto, {
        where: {
          id: id,
        },
        transaction,
        returning: true,
      });
    return numRecordUpdates > 0 ? updateRecordData : null;
  }

  async remove(id: string) {
    const existingOrder = await this.orderRepository.findByPk(id);

    if (!existingOrder)
      throw new BadRequestException("Không tồn tại đơn hàng tương ứng");

    await this.orderRepository.destroy({ where: { id } });
  }
}
