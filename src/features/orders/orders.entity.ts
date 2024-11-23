import { UUIDV4 } from 'sequelize';
import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  Default,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Staffs } from '../staffs/staffs.entity';
import { Customers } from '../customers/customers.entity';
import { Coupons } from '../coupons/coupons.entity';
import { Book } from '../book/book.entity';

@Table
export class Orders extends Model<Orders> {
  @PrimaryKey
  @Default(UUIDV4)
  @Column(DataType.UUID)
  id: string;

  @AllowNull(false)
  @Column(DataType.DATE)
  createdTime: Date;

  @Default(0)
  @AllowNull(false)
  @Column(DataType.FLOAT)
  totalPrice: number;

  @ForeignKey(() => Staffs)
  @Column(DataType.UUID)
  staffId: string;

  @BelongsTo(() => Staffs, { onDelete: 'SET NULL' })
  staff: Staffs;

  @ForeignKey(() => Customers)
  @Column(DataType.UUID)
  customerId: string;

  @BelongsTo(() => Customers, { onDelete: 'SET NULL' })
  customer: Customers;

  @ForeignKey(() => Coupons)
  @Column(DataType.UUID)
  couponId: string;

  @BelongsTo(() => Coupons)
  coupon: Coupons;

  @HasMany(() => Book)
  books: Book[];
}
