import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, IsDate } from 'class-validator';

export class updateCommentDto {
    @IsNotEmpty()
    movieId: string;

    @IsNotEmpty()
    userId: string;

    @IsNotEmpty()
    @IsDate()
    @Type(() => Date)
    commentTime: Date;

    @IsString()
    @IsNotEmpty()
    comment: string;
}
