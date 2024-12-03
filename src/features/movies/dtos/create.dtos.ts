import { ApiProperty } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsDate,
  IsOptional,
  ValidateNested,
} from "class-validator";
import { createActors } from "src/features/actors/dtos/create.dto";
import { createDirectors } from "src/features/directors/dtos/create.dto";

export class CreateMovies {
  @ApiProperty({
    description: "Ngày phát hành phim",
    example: "2024-11-29",
  })
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  publishDay: Date;

  @ApiProperty({
    description: "Thời lượng phim (tính bằng phút)",
    example: 120,
  })
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  length: number;

  @ApiProperty({
    description: "Giới hạn độ tuổi (số nguyên)",
    example: 13,
  })
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  ageLimitation: number;

  @ApiProperty({
    description: "Tên phim",
    example: "Tên phim mẫu",
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: "Quốc gia sản xuất phim",
    example: "Việt Nam",
  })
  @IsNotEmpty()
  @IsString()
  country: string;

  @ApiProperty({
    description: "Mô tả chi tiết về phim",
    example: "Mô tả chi tiết nội dung phim.",
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    description: "File của phim",
    type: "string",
    format: "binary",
    required: false, // Nếu file có thể không bắt buộc
  })
  @IsOptional()
  file: Express.Multer.File;

  @ApiProperty({
    description: "Danh sách các diễn viên",
    example: [
      {
        movieId: "a",
        age: 12,
        firstName: "a",
        lastName: "hihi",
      },
    ],
  })
  @IsOptional()
  @Transform(({ value }) =>
    typeof value === "string" ? JSON.parse(value) : value,
  )
  @Type(() => createActors)
  actors: createActors[];

  @ApiProperty({
    description: "Danh sách các diễn viên",
    example: [
      {
        movieId: "a",
        age: 12,
        firstName: "a",
        lastName: "hihi",
      },
    ],
  })
  @IsOptional()
  @Transform(({ value }) =>
    typeof value === "string" ? JSON.parse(value) : value,
  )
  @Type(() => createDirectors)
  directors: createDirectors[];
}
