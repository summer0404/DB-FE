import { UUIDV4 } from "sequelize";
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
} from "sequelize-typescript";
import { Staffs } from "../staffs/staffs.entity";
import { Coupons } from "../coupons/coupons.entity";
import { Book } from "../book/book.entity";
import { PaymentMethod, PaymentStatus } from "src/common/constants";
import { Users } from "../users/users.entity";
import { Tickets } from "../tickets/tickets.entity";

@Table
export class Orders extends Model<Orders> {
  @PrimaryKey
  @Default(UUIDV4)
  @Column(DataType.UUID)
  id: string;

  @AllowNull(false)
  @Default(new Date())
  @Column(DataType.DATE)
  createdTime: Date;

  @Default(0)
  @AllowNull(false)
  @Column(DataType.FLOAT)
  totalPrice: number;

  @ForeignKey(() => Staffs)
  @AllowNull(true)
  @Column(DataType.UUID)
  staffId: string;

  @BelongsTo(() => Staffs, { onDelete: "SET NULL" })
  staff: Staffs;

  @ForeignKey(() => Coupons)
  @AllowNull(true)
  @Column(DataType.UUID)
  couponId: string;

  @BelongsTo(() => Coupons)
  coupon: Coupons;

  @HasMany(() => Book)
  books: Book[];

  @ForeignKey(() => Users)
  @AllowNull(false)
  @Column(DataType.UUID)
  userId: string;

  @AllowNull(true)
  @Default(PaymentMethod.ONLINE)
  @Column(DataType.ENUM(...Object.values(PaymentMethod)))
  paymentMethod: PaymentMethod;

  @AllowNull(true)
  @Column(DataType.DATE)
  timePayment: Date;

  @AllowNull(false)
  @Default(PaymentStatus.IN_PROGRESS)
  @Column(DataType.ENUM(...Object.values(PaymentStatus)))
  paymentStatus: PaymentStatus;

  @AllowNull(false)
  @Default(0)
  @Column(DataType.FLOAT)
  realPrice: number;

  @HasMany(() => Tickets, { onDelete: "SET NULL" })
  tickets: Tickets[];
}
