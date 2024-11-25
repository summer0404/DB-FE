import { Body, Controller, HttpException, HttpStatus, Post, Res } from '@nestjs/common';
import { ActorsService } from './actors.service';
import { LoggerService } from '../logger/logger.service';
import { Response } from '../response/response.entity';
import { createActors } from './dtos/create.dto';

@Controller('actors')
export class ActorsController {
    constructor(
        private readonly actorService: ActorsService,
        private readonly logger: LoggerService,
        private readonly response: Response
    ) { }
    @Post("/create")
    async getHello(@Res() res, @Body() createDto:createActors) {
        try {
            const temp = await this.actorService.create(createDto)
            this.logger.debug('Tạo diễn viên thành công');
            this.response.initResponse(true, 'Tạo diễn viên thành công', temp);
        } catch (error) {
            this.logger.error(error.message, error.stack);
            if (error instanceof HttpException) {
                this.response.initResponse(false, error.message, null);
                return res.status(error.getStatus()).json(this.response);
            } else {
                this.response.initResponse(false, 'Lỗi trong quá trình..', null);
                return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response);
            }
        }
    }
}
