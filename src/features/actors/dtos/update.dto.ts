import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength } from "class-validator";
import { UUID } from "crypto";
import { NotNull } from "sequelize-typescript";

export class updateActors {
    @IsNotEmpty()
    id:string
    @IsNotEmpty()
    movieId: string
    @IsNotEmpty()
    age: number
    @IsNotEmpty()
    firstName: string
    @IsNotEmpty()
    lastName: string
}