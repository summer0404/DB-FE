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
import { Users } from "../users/users.entity";

@Table
export class Rates extends Model<Rates> {
  @ForeignKey(() => Movies)
  @Column({ type: DataType.UUID, primaryKey: true })
  movieId: string;

  @ForeignKey(() => Users)
  @Column({ type: DataType.UUID, primaryKey: true })
  userId: string;

  @AllowNull(false)
  @Column(DataType.FLOAT)
  stars: number;

  @AllowNull(true)
  @Column(DataType.DATE)
  rateTime: Date;

  @BelongsTo(() => Users, { onDelete: "CASCADE" })
  user: Users;

  @BelongsTo(() => Movies, { onDelete: "CASCADE" })
  movie: Movies;
}
