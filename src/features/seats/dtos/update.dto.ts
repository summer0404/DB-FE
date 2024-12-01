import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { SeatStatus } from 'src/common/constants';

export class UpdateSeatDto {
    @ApiProperty({
        description: 'ID của phòng chiếu nơi ghế được cập nhật',
        example: 'room123',
    })
    @IsNotEmpty()
    roomId: string;

    @ApiProperty({
        description: 'Tên của ghế (mã ghế)',
        example: 'A1',
    })
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        description: 'Trạng thái của ghế',
        enum: SeatStatus,
        example: SeatStatus.FULL,
        required: false,
    })
    @IsEnum(SeatStatus)
    @IsNotEmpty()
    status?: SeatStatus;
}
