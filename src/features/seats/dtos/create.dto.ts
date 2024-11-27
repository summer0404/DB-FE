import { IsEnum, IsNotEmpty } from "class-validator";
import { SeatStatus } from "src/common/constants";

export class CreateSeatDto {
    @IsNotEmpty()
    roomId: string;

    @IsNotEmpty()
    name: string;

    @IsEnum(SeatStatus)
    @IsNotEmpty()
    status: SeatStatus;
}