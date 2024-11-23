import {
  AllowNull,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Rooms } from '../rooms/rooms.entity';
import { SeatStatus } from 'src/common/constants';

@Table
export class Seats extends Model<Seats> {
  @PrimaryKey
  @ForeignKey(() => Rooms)
  @Column(DataType.UUID)
  roomId: string;

  @PrimaryKey
  @Column(DataType.STRING)
  name: string;

  @AllowNull(false)
  @Column(DataType.ENUM(SeatStatus.EMPTY, SeatStatus.FULL))
  status: SeatStatus;
}
