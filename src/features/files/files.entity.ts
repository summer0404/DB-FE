import { UUIDV4 } from "sequelize";
import {
  AllowNull,
  BeforeValidate,
  BelongsTo,
  Column,
  DataType,
  Default,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import { Users } from "../users/users.entity";
import { Movies } from "../movies/movies.entity";

@Table
export class Files extends Model<Files> {
  @PrimaryKey
  @Default(UUIDV4)
  @Column(DataType.UUID)
  id: string;

  @AllowNull(true)
  @Column(DataType.STRING)
  path: string;

  @AllowNull(true)
  @Column(DataType.STRING)
  name: string;

  @AllowNull(true)
  @Column(DataType.STRING)
  key: string;

  @AllowNull(true)
  @Column(DataType.STRING)
  size: string;

  @AllowNull(true)
  @Column(DataType.INTEGER)
  pages: number;

  @ForeignKey(() => Users)
  @AllowNull(true)
  @Column(DataType.UUID)
  userId: string;

  @BelongsTo(() => Users, { onDelete: "CASCADE" })
  user: Users;

  @ForeignKey(() => Movies)
  @AllowNull(true)
  @Column(DataType.UUID)
  movieId: string;

  @BelongsTo(() => Movies, { onDelete: "CASCADE" })
  movie: Movies;

  @BeforeValidate
  static async validateFileOwnership(instance: Files) {
    if (instance.userId != null && instance.movieId != null) {
      throw new Error(
        "A file can only belong to either a user or a movie, not both.",
      );
    }
  }
}
