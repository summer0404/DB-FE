import {
  AllowNull,
  Column,
  DataType,
  Default,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Movies } from '../movies/movies.entity';
import { UUIDV4 } from 'sequelize';

@Table
export class Directors extends Model<Directors> {
  @ForeignKey(() => Movies)
  @Column({ type: DataType.UUID, primaryKey: true })
  movieId: string;

  @Default(UUIDV4)
  @Column({ type: DataType.UUID, primaryKey: true })
  id: string;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  age: number;

  @AllowNull(false)
  @Column(DataType.STRING(30))
  firstName: string;

  @AllowNull(false)
  @Column(DataType.STRING(30))
  lastName: string;
}
