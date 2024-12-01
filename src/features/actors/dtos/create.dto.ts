import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsInt } from "class-validator";

export class createActors {
    @ApiProperty({
        description: "ID của bộ phim",
        example: "abcd1234",
    })
    @IsNotEmpty()
    movieId: string;

    @ApiProperty({
        description: "Tuổi của diễn viên",
        example: 30,
    })
    @IsNotEmpty()
    @IsInt()
    age: number;

    @ApiProperty({
        description: "Tên đầu của diễn viên",
        example: "John",
    })
    @IsNotEmpty()
    firstName: string;

    @ApiProperty({
        description: "Họ của diễn viên",
        example: "Doe",
    })
    @IsNotEmpty()
    lastName: string;
}
