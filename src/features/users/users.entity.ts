import { UUIDV4 } from "sequelize";
import {
  AllowNull,
  Column,
  DataType,
  Default,
  HasOne,
  PrimaryKey,
  Table,
  Model,
  HasMany,
} from "sequelize-typescript";
import { UserType } from "src/common/constants";
import { Staffs } from "../staffs/staffs.entity";
import { Customers } from "../customers/customers.entity";
import { Files } from "../files/files.entity";
import { Comments } from "../comments/comments.entity";
import { Rates } from "../rates/rates.entity";

@Table
export class Users extends Model<Users> {
  @PrimaryKey
  @Default(UUIDV4)
  @Column(DataType.UUID)
  id: string;

  @AllowNull(false)
  @Column(DataType.STRING(30))
  firstName: string;

  @AllowNull(false)
  @Column(DataType.STRING(30))
  lastName: string;

  @AllowNull(false)
  @Column(DataType.DATE)
  dateOfBirth: Date;

  @AllowNull(false)
  @Column(DataType.STRING(50))
  email: string;

  @Column(DataType.STRING(11))
  phoneNumber: string;

  @AllowNull(false)
  @Default(UserType.CUSTOMER)
  @Column(DataType.STRING)
  userType: UserType;

  @AllowNull(true)
  @Column(DataType.STRING)
  refreshToken: string;

  @HasOne(() => Staffs, { onDelete: "CASCADE" })
  staff: Staffs;

  @HasOne(() => Customers, { onDelete: "CASCADE" })
  customer: Customers;

  @HasOne(() => Files, { onDelete: "SET NULL" })
  file: Files;

  @HasOne(() => Rates, { onDelete: "CASCADE" })
  rate: Rates;

  @HasMany(() => Comments, { onDelete: "CASCADE" })
  comments: Comments[];
}
