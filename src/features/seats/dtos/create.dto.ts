import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty } from "class-validator";
import { SeatStatus } from "src/common/constants";

export class CreateSeatDto {
  @ApiProperty({
    description: "ID của phòng chiếu nơi ghế được tạo",
    example: 1,
  })
  @IsNotEmpty()
  roomId: number;

  @ApiProperty({
    description: "Tên của ghế (mã ghế)",
    example: "A1",
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: "Trạng thái của ghế",
    enum: SeatStatus,
    example: SeatStatus.IN_USE,
  })
  @IsEnum(SeatStatus)
  @IsNotEmpty()
  status: SeatStatus;
}
