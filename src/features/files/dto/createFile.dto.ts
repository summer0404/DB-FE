import { ApiProperty } from "@nestjs/swagger";
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Min,
} from "class-validator";

export class CreateFileDto {
  @ApiProperty({
    description: "Tên file",
    example: "document.pdf",
  })
  @IsNotEmpty({ message: "Tên file không được để trống" })
  @IsString({ message: "Tên file phải là chuỗi ký tự" })
  name?: string;

  @ApiProperty({
    description: "Khóa file",
    example: "unique-key-123",
  })
  @IsOptional()
  @IsNotEmpty({ message: "Khóa file không được để trống" })
  @IsString({ message: "Khóa file phải là chuỗi ký tự" })
  key?: string;

  @ApiProperty({
    description: "Đường dẫn file",
    example: "/uploads/document.pdf",
  })
  @IsNotEmpty({ message: "Đường dẫn file không được để trống" })
  @IsString({ message: "Đường dẫn file phải là chuỗi ký tự" })
  path?: string;

  @ApiProperty({
    description: "Kích thước file",
    example: "1.2 MB",
  })
  @IsNotEmpty({ message: "Kích thước file không được để trống" })
  @IsString({ message: "Kích thước file phải là chuỗi ký tự" })
  size?: string;

  @ApiProperty({
    description: "Số trang của file",
    example: 10,
  })
  @IsOptional()
  @IsNumber({}, { message: "Số trang phải là một số" })
  @Min(1, { message: "Số trang phải lớn hơn hoặc bằng 1" })
  pages?: number;

  @ApiProperty({
    description: "ID của người sở hữu file",
    example: "4d5e6f7g-8h9i-0j1k-2l3m-4n5o6p7q8r9s",
  })
  @IsOptional()
  @IsUUID(4, { message: "ID người dùng phải là UUID hợp lệ" })
  userId?: string;

  @ApiProperty({
    description: "ID của phim sở hữu file",
    example: "4d5e6f7g-8h9i-0j1k-2l3m-4n5o6p7q8r9s",
  })
  @IsOptional()
  @IsUUID(4, { message: "ID người dùng phải là UUID hợp lệ" })
  movieId?: string;
}
