import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class CreateRateDto {
    @ApiProperty({
        description: 'ID của bộ phim được đánh giá',
        example: 'movie123',
    })
    @IsNotEmpty()
    movieId: string;

    @ApiProperty({
        description: 'ID của người dùng thực hiện đánh giá',
        example: 'user456',
    })
    @IsNotEmpty()
    userId: string;

    @ApiProperty({
        description: 'Số sao đánh giá, giá trị từ 1 đến 5',
        example: 5,
    })
    @IsNotEmpty()
    stars: number;

    @ApiProperty({
        description: 'Thời gian thực hiện đánh giá (ISO 8601 format)',
        example: '2024-11-29T10:30:00Z',
    })
    @IsNotEmpty()
    @Type(() => Date)
    rateTime: Date;
}
