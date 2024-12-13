import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { CreateCouponDto } from "./dto/createCoupon.dto";
import { UpdateCouponDto } from "./dto/updateCoupon.dto";
import { COUPON_REPOSITORY } from "src/common/constants";
import { Coupons } from "./coupons.entity";
import { Transaction } from "sequelize";

@Injectable()
export class CouponsService {
  constructor(
    @Inject(COUPON_REPOSITORY)
    private readonly couponRepository: typeof Coupons,
  ) {}

  async create(createCouponDto: CreateCouponDto): Promise<Coupons> {
    return await this.couponRepository.create(createCouponDto);
  }

  async findAll(): Promise<Coupons[]> {
    return await this.couponRepository.findAll();
  }

  async findOne(id: string): Promise<Coupons> {
    return await this.couponRepository.findOne({ where: { id } });
  }

  async update(id: string, updateCustomerDto: UpdateCouponDto) {
    const existingCoupon = await this.couponRepository.findOne({
      where: { id },
    });

    if (!existingCoupon)
      throw new BadRequestException("Không tồn tại phiếu giảm giá");

    if (
      updateCustomerDto?.isUsed &&
      updateCustomerDto?.isUsed.length >= 1 &&
      existingCoupon?.isUsed
    ) {
      updateCustomerDto.isUsed.push(...existingCoupon?.isUsed);
    }

    const [numRecordUpdates, [updateRecordData]] =
      await this.couponRepository.update(updateCustomerDto, {
        where: {
          id: id,
        },
        returning: true,
      });
    return numRecordUpdates > 0 ? updateRecordData : null;
  }

  async updateNew(id: string, updateCustomerDto: UpdateCouponDto) {
    const existingCoupon = await this.couponRepository.findOne({
      where: { id },
    });

    if (!existingCoupon)
      throw new BadRequestException("Không tồn tại phiếu giảm giá");

    const [numRecordUpdates, [updateRecordData]] =
      await this.couponRepository.update(updateCustomerDto, {
        where: {
          id: id,
        },
        returning: true,
      });
    return numRecordUpdates > 0 ? updateRecordData : null;
  }

  async updateTransaction(
    id: string,
    updateCustomerDto: UpdateCouponDto,
    transaction: Transaction,
  ) {
    const existingCoupon = await this.couponRepository.findOne({
      where: { id },
      transaction,
    });

    if (!existingCoupon)
      throw new BadRequestException("Không tồn tại phiếu giảm giá");

    if (
      updateCustomerDto?.isUsed &&
      updateCustomerDto?.isUsed.length >= 1 &&
      existingCoupon?.isUsed
    ) {
      updateCustomerDto.isUsed.push(...existingCoupon?.isUsed);
    }

    const [numRecordUpdates, [updateRecordData]] =
      await this.couponRepository.update(updateCustomerDto, {
        where: {
          id: id,
        },
        transaction,
        returning: true,
      });
    return numRecordUpdates > 0 ? updateRecordData : null;
  }

  async updateNewTransaction(
    id: string,
    updateCustomerDto: UpdateCouponDto,
    transaction: Transaction,
  ) {
    const existingCoupon = await this.couponRepository.findOne({
      where: { id },
      transaction,
    });

    if (!existingCoupon)
      throw new BadRequestException("Không tồn tại phiếu giảm giá");

    const [numRecordUpdates, [updateRecordData]] =
      await this.couponRepository.update(updateCustomerDto, {
        where: {
          id: id,
        },
        transaction,
        returning: true,
      });
    return numRecordUpdates > 0 ? updateRecordData : null;
  }

  async remove(id: string) {
    const existingCoupon = await this.couponRepository.findOne({
      where: { id },
    });

    if (!existingCoupon)
      throw new BadRequestException("Không tồn tại phiếu giảm giá tương ứng");

    await this.couponRepository.destroy({ where: { id } });
  }
}
