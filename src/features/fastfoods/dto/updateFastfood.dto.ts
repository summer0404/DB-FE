import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { fastfoodGroup } from "src/common/constants";
import { Type } from "class-transformer";

export class UpdateFastfoodDto {
  @ApiProperty({
    description: "Tên của thức ăn nhanh",
    example: "CocaCola",
  })
  @IsOptional()
  @IsString({ message: "Tên của thức ăn nhanh phải có dạng chuỗi" })
  name: string;

  @ApiProperty({
    description: "Loại thức ăn nhanh",
    example: fastfoodGroup.POPCORN,
  })
  @IsOptional()
  @IsEnum(fastfoodGroup, {
    message: `Loại thức ăn nhanh phải là ${fastfoodGroup.POPCORN} hoặc ${fastfoodGroup.SNACK} hoặc ${fastfoodGroup.SOFTDRINK}`,
  })
  group: fastfoodGroup;

  @ApiProperty({
    description: "Giá của thức ăn nhanh",
    example: 40,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { message: "Giá của thức ăn nhanh phải có dạng số" })
  price: number;
}
