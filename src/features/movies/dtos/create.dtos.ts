import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsString, IsNumber, IsArray, IsDate } from "class-validator";
import { Files } from "src/features/files/files.entity";

export class CreateMovies {
    @ApiProperty({ description: "Publish date of the movie", type: Date })
    @IsNotEmpty()
    @IsDate()
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

    @ApiProperty({ description: "Files associated with the movie", isArray: true, type: String })
    @IsNotEmpty()
    @IsArray()
    @Type(()=>Files)
    files: Files[];

    @ApiProperty({ description: "Genres of the movie", isArray: true, type: String })
    @IsNotEmpty()
    @IsArray()
    genres: string[];

    @ApiProperty({ description: "Comments on the movie", isArray: true, type: String })
    @IsNotEmpty()
    @IsArray()
    comments: string[];

    @ApiProperty({ description: "Ratings of the movie", isArray: true, type: Number })
    @IsNotEmpty()
    @IsArray()
    rate: number[];

    @ApiProperty({ description: "Actors in the movie", isArray: true, type: String })
    @IsNotEmpty()
    @IsArray()
    actors: string[];

    @ApiProperty({ description: "Directors of the movie", isArray: true, type: String })
    @IsNotEmpty()
    @IsArray()
    directors: string[];
}
