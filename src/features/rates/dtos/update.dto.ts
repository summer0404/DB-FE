import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class UpdateRateDto {
    @ApiProperty({
        description: 'ID của bộ phim cần cập nhật đánh giá',
        example: 'movie123',
    })
    @IsNotEmpty()
    movieId: string;

    @ApiProperty({
        description: 'ID của người dùng thực hiện cập nhật đánh giá',
        example: 'user456',
    })
    @IsNotEmpty()
    userId: string;

    @ApiProperty({
        description: 'Số sao mới, giá trị từ 1 đến 5',
        example: 4,
        required: false,
    })
    stars?: number;

    @ApiProperty({
        description: 'Thời gian cập nhật đánh giá (ISO 8601 format)',
        example: '2024-12-01T14:00:00Z',
        required: false,
    })
    @Type(() => Date)
    rateTime?: Date;
}
