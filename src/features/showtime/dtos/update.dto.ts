import { Type } from "class-transformer"
import { IsNotEmpty } from "class-validator"

export class UpdateShowtimeDto {
    @IsNotEmpty()
    movieId: string
    @IsNotEmpty()
    @Type(() => Date)
    startTime: Date
    @IsNotEmpty()
    roomId: string
}