import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import { Movies } from "../movies/movies.entity";
import { Rooms } from "../rooms/rooms.entity";

@Table
export class Showtime extends Model<Showtime> {
  @PrimaryKey
  @ForeignKey(() => Movies)
  @Column(DataType.UUID)
  movieId: string;

  @PrimaryKey
  @Column(DataType.DATE)
  startTime: Date;

  @AllowNull(false)
  @Column(DataType.DATE)
  endTime: Date;

  @ForeignKey(() => Rooms)
  @Column(DataType.INTEGER)
  roomId: number;

  @BelongsTo(() => Movies, { onDelete: "CASCADE" })
  movie: Movies;

  @BelongsTo(() => Rooms, { onDelete: "CASCADE" })
  room: Rooms;
}
