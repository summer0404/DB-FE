import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class UpdateRoomDto {
  @ApiProperty({
    description: "Id của phòng chiếu",
    example: "2024-11-29",
  })
  @IsNotEmpty()
  @IsString()
  id: string;

  @ApiProperty({
    description: "Tên phòng chiếu",
    example: "Tên phòng chiếu",
  })
  @IsNotEmpty()
  name: string;
}
