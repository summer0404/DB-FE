import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, IsUUID, IsDate } from 'class-validator';

export class CreateCommentDto {
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
