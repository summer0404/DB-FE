import { Type } from "class-transformer";
import { IsNotEmpty } from "class-validator";

export class CreateRateDto {
    @IsNotEmpty()
    movieId: string;

    @IsNotEmpty()
    userId: string;

    @IsNotEmpty()
    stars: number;

    @IsNotEmpty()
    @Type(() => Date)
    rateTime: Date;
}