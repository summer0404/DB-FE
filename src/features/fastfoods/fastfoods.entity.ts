import { UUIDV4 } from "sequelize";
import {
  AllowNull,
  Column,
  DataType,
  Default,
  HasMany,
  HasOne,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import { Book } from "../book/book.entity";
import { Files } from "../files/files.entity";

@Table
export class Fastfoods extends Model<Fastfoods> {
  @PrimaryKey
  @Default(UUIDV4)
  @Column(DataType.UUID)
  id: string;

  @AllowNull(false)
  @Column(DataType.STRING(30))
  name: string;

  @AllowNull(false)
  @Column(DataType.FLOAT)
  price: number;

  @HasMany(() => Book, { onDelete: "CASCADE" })
  books: Book[];

  @HasOne(() => Files, { onDelete: "CASCADE" })
  file: Files[];
}
