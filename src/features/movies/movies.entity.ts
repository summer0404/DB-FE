import { UUIDV4 } from "sequelize";
import {
  AllowNull,
  Column,
  DataType,
  Default,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import { Files } from "../files/files.entity";
import { Genre } from "../genre/genre.entity";
import { Directors } from "../directors/directors.entity";
import { Actors } from "../actors/actors.entity";
import { Comments } from "../comments/comments.entity";
import { Rates } from "../rates/rates.entity";

@Table
export class Movies extends Model<Movies> {
  @PrimaryKey
  @Default(UUIDV4)
  @Column(DataType.UUID)
  id: string;

  @AllowNull(true)
  @Column(DataType.DATE)
  publishDay: Date;

  @AllowNull(true)
  @Column(DataType.FLOAT)
  length: number;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  ageLimitation: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  name: string;

  @AllowNull(true)
  @Column(DataType.STRING(30))
  country: string;

  @AllowNull(true)
  @Column(DataType.TEXT)
  description: string;

  @HasMany(() => Files, { onDelete: "CASCADE" })
  files: Files[];

  @HasMany(() => Genre, { onDelete: "CASCADE" })
  genres: Genre[];

  @HasMany(() => Comments, { onDelete: "CASCADE" })
  comments: Comments[];

  @HasMany(() => Rates, { onDelete: "CASCADE" })
  rate: Rates[];

  @HasMany(() => Actors, { onDelete: "CASCADE" })
  actors: Actors[];

  @HasMany(() => Directors, { onDelete: "CASCADE" })
  directors: Directors[];
}
