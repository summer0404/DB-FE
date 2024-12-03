import { ApiProperty } from "@nestjs/swagger";
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from "class-validator";
import { MovieGenre } from "src/common/constants"; // Make sure this imports the enum properly.

export class CreateGenreDto {
  @ApiProperty({
    description: "ID của phim",
    example: "57f0bfe7-2c28-4d15-be3c-b2f3cfccee55",
  })
  @IsNotEmpty({ message: "movieId không được để trống" })
  @IsUUID(4, { message: "movieId phải có dạng UUIDv4" })
  movieId: string;

  @ApiProperty({
    description: "Thể loại",
    example: MovieGenre.ACTION,
  })
  @IsOptional()
  @IsEnum(MovieGenre, {
    message: `Thể loại có thể nhận giá trị là ${Object.values(MovieGenre).join(", ")}`,
  })
  genre: MovieGenre;
}
