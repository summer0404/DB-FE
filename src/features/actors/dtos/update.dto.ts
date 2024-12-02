import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString, IsInt } from "class-validator";

export class updateActors {
    @ApiProperty({
        description: "ID của diễn viên",
        example: "efgh5678",
    })
    @IsNotEmpty()
    id: string;

    @ApiProperty({
        description: "ID của bộ phim",
        example: "abcd1234",
    })
    @IsNotEmpty()
    movieId: string;

    @ApiProperty({
        description: "Tuổi của diễn viên (tùy chọn)",
        example: 35,
    })
    @IsOptional()
    @IsInt()
    age?: number;

    @ApiProperty({
        description: "Tên đầu của diễn viên (tùy chọn)",
        example: "Jane",
    })
    @IsOptional()
    firstName?: string;

    @ApiProperty({
        description: "Họ của diễn viên (tùy chọn)",
        example: "Smith",
    })
    @IsOptional()
    lastName?: string;
}
