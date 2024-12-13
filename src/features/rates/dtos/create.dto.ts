import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateRateDto {
  @ApiProperty({
    description: "ID của bộ phim được đánh giá",
    example: "movie123",
  })
  @IsNotEmpty({ message: "movieId không được để trống" })
  movieId: string;

  @ApiProperty({
    description: "ID của người dùng thực hiện đánh giá",
    example: "user456",
  })
  @IsNotEmpty({ message: "userIduserId không được để trống" })
  userId: string;

  @ApiProperty({
    description: "Số sao đánh giá, giá trị từ 1 đến 5",
    example: 5,
  })
  @IsNotEmpty()
  stars: number;

  @ApiProperty({
    description: "Thời gian thực hiện đánh giá (ISO 8601 format)",
    example: "2024-11-29T10:30:00Z",
  })
  @IsNotEmpty()
  @Type(() => Date)
  rateTime: Date;

  @ApiProperty({
    description: "Nội dung bình luận",
    example: "Đây là bình luận của tôi về bộ phim này.",
  })
  @IsString()
  @IsNotEmpty({ message: "Bình luậnuận không được để trống" })
  comment: string;
}
