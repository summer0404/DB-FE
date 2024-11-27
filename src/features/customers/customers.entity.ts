import {
  AllowNull,
  Column,
  DataType,
  ForeignKey,
  PrimaryKey,
  Table,
  BelongsTo,
  HasMany,
  Model,
  Default,
} from 'sequelize-typescript';
import { Users } from '../users/users.entity';
import { UUID } from 'sequelize';
import { Orders } from '../orders/orders.entity';

@Table
export class Customers extends Model<Customers> {
  @PrimaryKey
  @ForeignKey(() => Users)
  @Column({ type: UUID, onDelete: 'CASCADE' })
  id: string;

  @AllowNull(false)
  @Default(0)
  @Column(DataType.INTEGER)
  discountPoints: number;

  // ForeignKey for recursive relationship
  @ForeignKey(() => Customers)
  @AllowNull(true) // Cho phép NULL
  @Column(DataType.UUID)
  referrerId: string;

  // Relationship setup
  @BelongsTo(() => Customers, {
    foreignKey: 'referrerId',
    onDelete: 'SET NULL',
    as: 'referrer',
  })
  referrer: Customers;

  @BelongsTo(() => Users, { onDelete: 'CASCADE' })
  user: Users;

  @HasMany(() => Customers, {
    foreignKey: 'referrerId',
    onDelete: 'SET NULL',
    as: 'referrals',
  })
  referrals: Customers[];

  @HasMany(() => Orders, { onDelete: 'SET NULL' })
  orders: Orders[];
}
