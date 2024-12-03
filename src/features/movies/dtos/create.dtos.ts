import { ApiProperty } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsDate,
  IsOptional,
  IsArray,
} from "class-validator";
import { MovieGenre } from "src/common/constants";
import { createActors } from "src/features/actors/dtos/create.dto";
import { createDirectors } from "src/features/directors/dtos/create.dto";
import { CreateGenreDto } from "src/features/genre/dtos/create.dto";

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
    description: "Danh sách file của phim",
    type: "string",
    format: "binary",
    required: false, // Nếu các file không bắt buộc
    isArray: true, // Chỉ định đây là mảng
  })
  @IsOptional()
  @IsArray()
  files: Array<Express.Multer.File>; // Định nghĩa mảng các file

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

  @ApiProperty({
    description: "Danh sách các diễn viên",
    example: [
      {
        movieId: "a",
        genre: MovieGenre.ACTION,
      },
    ],
  })
  @IsOptional()
  @Transform(({ value }) =>
    typeof value === "string" ? JSON.parse(value) : value,
  )
  @Type(() => CreateGenreDto)
  genres: CreateGenreDto[];
}
