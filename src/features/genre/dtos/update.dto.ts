import { IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';
import { MovieGenre } from 'src/common/constants'; // Make sure this imports the enum properly.

export class UpdateGenreDto {
    @IsUUID()
    @IsOptional()
    movieId: string;

    @IsEnum(MovieGenre)
    @IsString()
    @IsOptional()
    genre?: MovieGenre;
}
