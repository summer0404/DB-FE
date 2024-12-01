import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty } from "class-validator";

export class UpdateShowtimeDto {
    @ApiProperty({
        description: "ID của bộ phim cần cập nhật lịch chiếu",
        example: "movie123"
    })
    @IsNotEmpty()
    movieId: string;

    @ApiProperty({
        description: "Thời gian bắt đầu mới của lịch chiếu (ISO 8601 format)",
        example: "2024-12-02T14:00:00Z"
    })
    @IsNotEmpty()
    @Type(() => Date)
    startTime: Date;

    @ApiProperty({
        description: "ID của phòng chiếu cần cập nhật",
        example: "roomB"
    })
    @IsNotEmpty()
    roomId: string;
}
