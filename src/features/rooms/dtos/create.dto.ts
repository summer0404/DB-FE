import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator"

export class CreateRoomDto {
    @ApiProperty({
        description: "Tên phòng chiếu",
        example: "Tên phòng chiếu",
    })
    @IsNotEmpty()
    @IsString()
    name: string;
}