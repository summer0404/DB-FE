import { IsEnum, IsString, IsUUID } from 'class-validator';
import { MovieGenre } from 'src/common/constants'; // Make sure this imports the enum properly.

export class CreateGenreDto {
    @IsUUID()
    movieId: string;

    @IsEnum(MovieGenre)
    @IsString()
    genre: MovieGenre;
}
