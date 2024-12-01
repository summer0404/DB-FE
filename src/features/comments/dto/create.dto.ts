import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, IsDate } from 'class-validator';

export class CreateCommentDto {
    @ApiProperty({
        description: 'ID của bộ phim',
        example: 'movie123',
    })
    @IsNotEmpty()
    movieId: string;

    @ApiProperty({
        description: 'ID của người dùng',
        example: 'user456',
    })
    @IsNotEmpty()
    userId: string;

    @ApiProperty({
        description: 'Thời gian bình luận (ISO format)',
        example: '2024-11-28T14:00:00.000Z',
    })
    @IsNotEmpty()
    @IsDate()
    @Type(() => Date)
    commentTime: Date;

    @ApiProperty({
        description: 'Nội dung bình luận',
        example: 'Đây là bình luận của tôi về bộ phim này.',
    })
    @IsString()
    @IsNotEmpty()
    comment: string;
}
