import { UUIDV4 } from "sequelize";
import {
  AllowNull,
  Column,
  DataType,
  Default,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import { Showtime } from "../showtime/showtime.entity";

// ID theo kieu so tang dan: 1,2,3,4,...
@Table
export class Rooms extends Model<Rooms> {
  @PrimaryKey
  @Column({
    type: DataType.INTEGER, // Sử dụng số nguyên
    autoIncrement: true, // Tự động tăng dần
  })
  id: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  name: string;

  @HasMany(() => Showtime, { onDelete: "CASCADE" })
  showtimes: Showtime[];
}
