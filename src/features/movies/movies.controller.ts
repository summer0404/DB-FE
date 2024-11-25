import { Controller } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { LoggerService } from '../logger/logger.service';
import { Response } from '../response/response.entity';

@Controller('movies')
export class MoviesController {
    constructor(
        private readonly movieService: MoviesService,
        private readonly logger: LoggerService,
        private readonly response: Response
    ) { }
    
}
