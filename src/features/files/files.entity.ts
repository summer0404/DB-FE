import { UUIDV4 } from 'sequelize';
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
} from 'sequelize-typescript';
import { Users } from '../users/users.entity';
import { Movies } from '../movies/movies.entity';

@Table
export class Files extends Model<Files> {
  @PrimaryKey
  @Default(UUIDV4)
  @Column(DataType.UUID)
  id: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  path: string;

  @Column(DataType.STRING)
  name: string;

  @ForeignKey(() => Users)
  @AllowNull(true)
  @Column(DataType.UUID)
  userId: string;

  @BelongsTo(() => Users, { onDelete: 'CASCADE' })
  user: Users;

  @ForeignKey(() => Movies)
  @AllowNull(true)
  @Column(DataType.UUID)
  movieId: string;

  @BelongsTo(() => Movies, { onDelete: 'CASCADE' })
  movie: Movies;

  @BeforeValidate
  static async validateFileOwnership(instance: Files) {
    if (instance.userId != null && instance.movieId != null) {
      throw new Error(
        'A file can only belong to either a user or a movie, not both.',
      );
    }
  }
}
