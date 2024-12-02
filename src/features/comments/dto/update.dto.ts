import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, IsDate } from 'class-validator';

export class updateCommentDto {
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
        description: 'Thời gian cập nhật bình luận (ISO format)',
        example: '2024-11-28T15:30:00.000Z',
    })
    @IsNotEmpty()
    @IsDate()
    @Type(() => Date)
    commentTime: Date;

    @ApiProperty({
        description: 'Nội dung bình luận mới',
        example: 'Tôi đã chỉnh sửa bình luận của mình để bổ sung ý kiến.',
    })
    @IsString()
    @IsNotEmpty()
    comment: string;
}
