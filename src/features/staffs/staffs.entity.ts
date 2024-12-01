import {
  AllowNull,
  Column,
  DataType,
  ForeignKey,
  PrimaryKey,
  Table,
  Model,
  HasMany,
  BelongsTo,
} from 'sequelize-typescript';
import { Users } from '../users/users.entity';
import { Orders } from '../orders/orders.entity';

@Table
export class Staffs extends Model<Staffs> {
  @PrimaryKey
  @ForeignKey(() => Users)
  @Column(DataType.UUID)
  id: string;

  @BelongsTo(() => Users, { onDelete: 'CASCADE' })
  user: Users;

  @AllowNull(true)
  @Column(DataType.FLOAT)
  salary: number;

  @AllowNull(true)
  @Column(DataType.STRING)
  position: string;

  @HasMany(() => Orders, { onDelete: 'SET NULL' })
  orders: Orders[];
}
