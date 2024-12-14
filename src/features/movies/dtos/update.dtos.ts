import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsArray,
  IsDate,
  IsOptional,
} from "class-validator";

export class UpdateMovies {
  @ApiProperty({
    description: "Ngày phát hành phim",
    example: "2024-11-29",
  })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  publishDay: Date;

  @ApiProperty({
    description: "Thời lượng phim (tính bằng phút)",
    example: 120,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  length: number;

  @ApiProperty({
    description: "Giới hạn độ tuổi (số nguyên)",
    example: 13,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  ageLimitation: number;

  @ApiProperty({
    description: "Tên phim",
    example: "Tên phim mẫu",
  })
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty({
    description: "Quốc gia sản xuất phim",
    example: "Việt Nam",
  })
  @IsOptional()
  @IsString()
  country: string;

  @ApiProperty({
    description: "Mô tả chi tiết về phim",
    example: "Mô tả chi tiết nội dung phim.",
  })
  @IsOptional()
  @IsString()
  description: string;

  //   @ApiProperty({
  //     description: "Danh sách file của phim",
  //     type: "string",
  //     format: "binary",
  //     required: false, // Nếu các file không bắt buộc
  //     isArray: true, // Chỉ định đây là mảng
  //   })
  //   @IsOptional()
  //   @IsArray()
  //   files: Array<Express.Multer.File> | Array<string>; // Định nghĩa mảng các file
}
