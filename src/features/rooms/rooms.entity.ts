import { UUIDV4 } from 'sequelize';
import {
  AllowNull,
  Column,
  DataType,
  Default,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Showtime } from '../showtime/showtime.entity';

@Table
export class Rooms extends Model<Rooms> {
  @PrimaryKey
  @Default(UUIDV4)
  @Column(DataType.UUID)
  id: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  name: string;

  @HasMany(() => Showtime, { onDelete: 'CASCADE' })
  showtimes: Showtime[];
}
