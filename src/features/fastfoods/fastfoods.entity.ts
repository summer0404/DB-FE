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
import { fastfoodGroup } from "src/common/constants";

// ID theo kieu ky tu tang dan: "F1", "F2", ....
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
  @Column(
    DataType.ENUM(
      fastfoodGroup.POPCORN,
      fastfoodGroup.SNACK,
      fastfoodGroup.SOFTDRINK,
    ),
  )
  group: fastfoodGroup;

  @AllowNull(false)
  @Column(DataType.FLOAT)
  price: number;

  @HasMany(() => Book, { onDelete: "CASCADE" })
  books: Book[];

  @HasOne(() => Files, { onDelete: "CASCADE" })
  file: Files[];

  static async generateCustomId(instance: Fastfoods) {
    // Lấy phần tử cuối cùng trong bảng
    const lastRecord = await Fastfoods.findOne({
      order: [["createdAt", "DESC"]], // Sắp xếp theo thời gian tạo giảm dần
    });

    // Nếu có bản ghi cuối cùng, lấy ID và tăng số thứ tự
    if (lastRecord) {
      const lastId = lastRecord.id; // Lấy ID cuối
      const numericPart = parseInt(lastId.replace("F", ""), 10); // Loại bỏ tiền tố và chuyển thành số
      instance.id = `F${numericPart + 1}`; // Tăng số thứ tự và thêm tiền tố
    } else {
      // Nếu chưa có bản ghi nào, bắt đầu từ F1
      instance.id = "F1";
    }
  }
}
