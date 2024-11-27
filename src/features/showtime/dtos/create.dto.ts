import { Type } from "class-transformer"
import { IsNotEmpty } from "class-validator"

export class CreateShowtimeDto {
    @IsNotEmpty()
    movieId: string
    @IsNotEmpty()
    @Type(() => Date)
    startTime: Date
    @IsNotEmpty()
    roomId: string
}