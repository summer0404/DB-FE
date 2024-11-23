import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Showtime } from '../showtime/showtime.entity';
import { Seats } from '../seats/seats.entity';
import { Orders } from '../orders/orders.entity';

@Table
export class Tickets extends Model<Tickets> {
  @PrimaryKey
  @Column(DataType.UUID)
  id: string;

  // Khóa ngoại trỏ tới movieId của Showtime
  @ForeignKey(() => Showtime)
  @Column(DataType.UUID)
  movieId: string;

  // Khóa ngoại trỏ tới startTime của Showtime
  @ForeignKey(() => Showtime)
  @Column(DataType.DATE)
  startTime: Date;

  @Column(DataType.FLOAT)
  price: number;

  // Liên kết tới Showtime
  @BelongsTo(() => Showtime, {
    foreignKey: 'movieId',
    targetKey: 'movieId',
    as: 'showtimeMovie',
  })
  showtimeMovie: Showtime;

  @BelongsTo(() => Showtime, {
    foreignKey: 'startTime',
    targetKey: 'startTime',
    as: 'showtimeStart',
  })
  showtimeStart: Showtime;

  @ForeignKey(() => Seats)
  @Column(DataType.UUID)
  seatId: string;

  @BelongsTo(() => Seats, {
    foreignKey: 'seatId',
    onDelete: 'CASCADE',
  })
  seat: Seats;

  @ForeignKey(() => Orders)
  @Column(DataType.UUID)
  orderId: string;

  @BelongsTo(() => Orders, {
    foreignKey: 'orderId',
    onDelete: 'SET NULL',
  })
  order: Orders;
}
