import {
  AllowNull,
  Column,
  DataType,
  Default,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import { Rooms } from "../rooms/rooms.entity";
import { SeatStatus } from "src/common/constants";
import { UUIDV4 } from "sequelize";
import { IsUUID } from "class-validator";

@Table
export class Seats extends Model<Seats> {
  @PrimaryKey
  @Default(UUIDV4)
  @IsUUID(4, { message: "ID phải có dạng UUIDv4" })
  @Column(DataType.UUID)
  id: string;

  @AllowNull(false)
  @ForeignKey(() => Rooms)
  @Column(DataType.INTEGER)
  roomId: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  name: string;

  @AllowNull(false)
  @Default(SeatStatus.IN_USE)
  @Column(DataType.ENUM(SeatStatus.IN_USE, SeatStatus.MAINTENANCE))
  status: SeatStatus;
}
