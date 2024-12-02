import {
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { MovieGenre } from 'src/common/constants';
import { Movies } from '../movies/movies.entity';

@Table
export class Genre extends Model<Genre> {
  @ForeignKey(() => Movies)
  @Column({ type: DataType.UUID, primaryKey: true })
  movieId: string;

  @Column({ type: DataType.STRING, primaryKey: true })
  genre: MovieGenre;
}
