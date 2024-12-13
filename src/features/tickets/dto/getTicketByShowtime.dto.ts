import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsUUID } from "class-validator";

export class GetTicketByShowtimeDto {
  @ApiProperty({
    description: "ID của phim",
    example: "dfde6cb0-92b6-4b5f-bfb6-b9615045d898",
  })
  @IsNotEmpty({ message: "ID của phim không được để trống" })
  @IsUUID(4, { message: "ID của phim phải có dạng UUIDv4" })
  movieId: string;

  @ApiProperty({
    description: "Thời gian chiếu",
    example: "2024-11-25 10:06:00.129+07",
  })
  @IsNotEmpty({ message: "Thời gian chiếu không được để trống" })
  @Type(() => Date)
  @IsDate({ message: "Thời gian chiếu phải có dạng Date" })
  startTime: Date;
}
