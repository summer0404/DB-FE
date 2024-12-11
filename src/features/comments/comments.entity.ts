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
export class Comments extends Model<Comments> {
  @PrimaryKey
  @ForeignKey(() => Movies)
  @Column(DataType.UUID)
  movieId: string;

  @PrimaryKey
  @ForeignKey(() => Users)
  @Column(DataType.UUID)
  userId: string;

  @BelongsTo(() => Users, { onDelete: "CASCADE" })
  user: Users;

  @BelongsTo(() => Movies, { onDelete: "CASCADE" })
  movie: Movies;

  @AllowNull(false)
  @Column(DataType.DATE)
  commentTime: Date;

  @AllowNull(false)
  @Column(DataType.TEXT)
  comment: string;
}
