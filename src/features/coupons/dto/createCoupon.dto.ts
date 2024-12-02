import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from "class-validator";

export class CreateCouponDto {
  @ApiProperty({
    description:
      "Thuộc tính xác định xem ai đã dùng phiếu giảm giá đã dùng hay chưa",
    example: ["userId1", "userId2"],
  })
  @IsOptional()
  @IsArray({ message: "Thuộc tính isUsed phải có dạng mảng của chuỗi" })
  isUsed: string[];

  @ApiProperty({
    description: "Tên của phiếu",
    example: "Chào mừng bạn mới",
  })
  @IsNotEmpty({ message: "Tên của phiếu không được để trống" })
  @IsString({ message: "Tên của phiếu phải có định dạng chuỗi" })
  name: string;

  @ApiProperty({
    description: "Thời gian hết hạn của phiếu",
    example: "2024-11-28 00:56:29.279+07",
  })
  @IsNotEmpty({ message: "Thời gian hết hạn không được để trống" })
  @Type(() => Date)
  @IsDate({ message: "Thời gian hết hạn phải có định dạng là Date" })
  expirationDate: Date;

  @ApiProperty({})
  @IsNotEmpty({ message: "Phần trăm không được để trống" })
  @Type(() => Number)
  @IsNumber({}, { message: "Phần trăm phải có dạng số" })
  @Min(2, { message: "Tối thiểu phần trăm giảm giá là 2" })
  @Max(20, { message: "Tối đa phần trăm giảm giá là 20" })
  percent: number;
}
