import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  Default,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from "sequelize-typescript";
import { Showtime } from "../showtime/showtime.entity";
import { Orders } from "../orders/orders.entity";
import { UUIDV4 } from "sequelize";

@Table
export class Tickets extends Model<Tickets> {
  @PrimaryKey
  @Default(UUIDV4)
  @Column(DataType.UUID)
  id: string;

  // Khóa ngoại trỏ tới movieId của Showtime
  @ForeignKey(() => Showtime)
  @AllowNull(false)
  @Column(DataType.UUID)
  movieId: string;

  // Khóa ngoại trỏ tới startTime của Showtime
  @ForeignKey(() => Showtime)
  @AllowNull(false)
  @Column(DataType.DATE)
  startTime: Date;

  @AllowNull(false)
  @Column(DataType.DATE)
  endTime: Date;

  @AllowNull(false)
  @Column(DataType.FLOAT)
  price: number;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  seatPosition: number;

  // Liên kết tới Showtime
  @BelongsTo(() => Showtime, {
    foreignKey: "movieId",
    targetKey: "movieId",
    as: "showtimeMovie",
  })
  showtimeMovie: Showtime;

  @BelongsTo(() => Showtime, {
    foreignKey: "startTime",
    targetKey: "startTime",
    as: "showtimeStart",
  })
  showtimeStart: Showtime;

  @ForeignKey(() => Orders)
  @AllowNull(true)
  @Column(DataType.UUID)
  orderId: string;

  @BelongsTo(() => Orders, {
    foreignKey: "orderId",
    onDelete: "SET NULL",
  })
  order: Orders;
}