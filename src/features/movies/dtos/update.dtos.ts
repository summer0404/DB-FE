import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsString, IsNumber, IsArray, IsDate } from "class-validator";
import { Files } from "src/features/files/files.entity";

export class UpdateMovies {
    @IsNotEmpty()
    @IsString()
    id: string

    @ApiProperty({ description: "Publish date of the movie", type: Date })
    @IsNotEmpty()
    @IsDate()
    @Type(() => Date)
    publishDay: Date;

    @ApiProperty({ description: "Length of the movie in minutes" })
    @IsNotEmpty()
    @IsNumber()
    length: number;

    @ApiProperty({ description: "Age limitation for the movie" })
    @IsNotEmpty()
    @IsNumber()
    ageLimitation: number;

    @ApiProperty({ description: "Name of the movie" })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({ description: "Country where the movie was produced" })
    @IsNotEmpty()
    @IsString()
    country: string;

    @ApiProperty({ description: "Description of the movie" })
    @IsNotEmpty()
    @IsString()
    description: string;
}
