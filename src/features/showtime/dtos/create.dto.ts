import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty } from "class-validator";

export class CreateShowtimeDto {
    @ApiProperty({
        description: "ID của bộ phim cần tạo lịch chiếu",
        example: "movie123"
    })
    @IsNotEmpty()
    movieId: string;

    @ApiProperty({
        description: "Thời gian bắt đầu chiếu phim (ISO 8601 format)",
        example: "2024-12-01T10:30:00Z"
    })
    @IsNotEmpty()
    @Type(() => Date)
    startTime: Date;

    @ApiProperty({
        description: "ID của phòng chiếu",
        example: "roomA"
    })
    @IsNotEmpty()
    roomId: string;
}
