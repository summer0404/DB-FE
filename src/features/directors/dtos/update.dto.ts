import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength } from "class-validator";
import { UUID } from "crypto";
import { NotNull } from "sequelize-typescript";

export class updateDirectors {
    @ApiProperty({
        description: 'ID của bộ phim',
        example: 'movie123',
    })
    @IsNotEmpty()
    movieId: string

    @ApiProperty({
        description: 'ID của đạo diễn',
        example: 'movie123',
    })
    @IsNotEmpty()
    id: string

    @ApiProperty({
        description: "Tuổi của đạo diễn",
        example: 30,
    })
    @IsNotEmpty()
    age: number

    @ApiProperty({
        description: "Tên đầu của đạo diễn",
        example: "John",
    })
    @IsNotEmpty()
    firstName: string;

    @ApiProperty({
        description: "Họ của đạo diễn",
        example: "Doe",
    })
    @IsNotEmpty()
    lastName: string;
}