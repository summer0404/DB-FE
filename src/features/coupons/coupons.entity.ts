import { UUIDV4 } from 'sequelize';
import {
  AllowNull,
  Column,
  DataType,
  Default,
  HasOne,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Orders } from '../orders/orders.entity';

@Table
export class Coupons extends Model<Coupons> {
  @PrimaryKey
  @Default(UUIDV4)
  @Column(DataType.UUID)
  id: string;

  @Default(false)
  @Column(DataType.BOOLEAN)
  isUsed: boolean;

  @AllowNull(false)
  @Column(DataType.DATE)
  expirationDate: Date;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  percent: number;

  @HasOne(() => Orders)
  order: Orders;
}
