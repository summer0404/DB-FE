import {
  AllowNull,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Orders } from '../orders/orders.entity';
import { Fastfoods } from '../fastfoods/fastfoods.entity';
import { SizeFastfood } from 'src/common/constants';

@Table
export class Book extends Model<Book> {
  @PrimaryKey
  @ForeignKey(() => Orders)
  @Column(DataType.UUID)
  orderId: string;

  @PrimaryKey
  @ForeignKey(() => Fastfoods)
  @Column(DataType.UUID)
  fastfoodId: string;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  quantity: number;

  @AllowNull(false)
  @Column(
    DataType.ENUM(SizeFastfood.BIG, SizeFastfood.MEDIUM, SizeFastfood.SMALL),
  )
  size: SizeFastfood;
}
