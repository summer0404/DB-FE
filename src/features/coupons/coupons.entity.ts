import { STRING, UUIDV4 } from 'sequelize';
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

  @AllowNull(true)
  @Column(DataType.ARRAY(DataType.STRING))
  isUsed: string[];

  @AllowNull(false)
  @Column(DataType.STRING)
  name: string;

  @AllowNull(false)
  @Column(DataType.DATE)
  expirationDate: Date;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  percent: number;

  @HasOne(() => Orders)
  order: Orders;
}
