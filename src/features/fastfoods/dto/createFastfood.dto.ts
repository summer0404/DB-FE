import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";
import { fastfoodGroup } from "src/common/constants";

export class CreateFastfoodDto {
  @ApiProperty({
    description: "Tên của thức ăn nhanh",
    example: "CocaCola",
  })
  @IsNotEmpty({ message: "Tên của thức ăn nhanh không được để trống" })
  @IsString({ message: "Tên của thức ăn nhanh phải có dạng chuỗi" })
  name: string;

  @ApiProperty({
    description: "Loại thức ăn nhanh",
    example: fastfoodGroup.POPCORN,
  })
  @IsNotEmpty({ message: "Loại thức ăn nhanh không được để trống" })
  @IsEnum(fastfoodGroup, {
    message: `Loại thức ăn nhanh phải là ${fastfoodGroup.POPCORN} hoặc ${fastfoodGroup.SNACK} hoặc ${fastfoodGroup.SOFTDRINK}`,
  })
  foodGroup: fastfoodGroup;

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
