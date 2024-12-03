import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateFastfoodDto {
  @ApiProperty({
    description: "Tên của thức ăn nhanh",
    example: "CocaCola",
  })
  @IsNotEmpty({ message: "Tên của thức ăn nhanh không được để trống" })
  @IsString({ message: "Tên của thức ăn nhanh phải có dạng chuỗi" })
  name: string;

  @ApiProperty({
    description: "Giá của thức ăn nhanh",
    example: 40,
  })
  @Type(() => Number)
  @IsNumber({}, { message: "Giá của thức ăn nhanh phải có dạng số" })
  price: number;

  @ApiProperty({
    description: "File ảnh của thức ăn nhanh",
    type: "string",
    format: "binary",
    required: false, // Nếu file có thể không bắt buộc
  })
  @IsOptional()
  file: Express.Multer.File;
}
