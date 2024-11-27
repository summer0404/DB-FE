import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { GenreService } from './genre.service';
import { LoggerService } from '../logger/logger.service';
import { Response } from '../response/response.entity';
import { CreateGenreDto } from './dtos/create.dto';

@Controller('genre')
export class GenreController {
    constructor(
        private readonly commentService: GenreService,
        private readonly logger: LoggerService,
        private readonly response: Response
    ) { }
    @Post("/create")
    async getHello(@Res() res, @Body() createDto: CreateGenreDto) {
        try {
            const temp = await this.commentService.create(createDto)
            this.logger.debug('Tạo thể loại phim thành công');
            this.response.initResponse(true, 'Tạo thể loại phim thành công', temp);
            return res.status(HttpStatus.OK).json(this.response)
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
    
    @Delete("/:movieId/:genre")
    async delete(
        @Res() res,
        @Param("genre") genre: string,
        @Param("movieId") movieId: string
    ) {
        try {
            const temp = await this.commentService.removeGenre(movieId, genre)
            this.logger.debug('Xóa bỏ thông tin thể loại phim thành công');
            this.response.initResponse(true, 'Xóa bỏ thông tin thể loại phim thành công', temp);
            return res.status(HttpStatus.OK).json(this.response)
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
    @Get("/all")
    async getAll(@Res() res) {
        try {
            const temp = await this.commentService.getAll()
            this.logger.debug('Lấy toàn bộ thông tin thể loại phim thành công');
            this.response.initResponse(true, 'Lấy toàn bộ thông tin thể loại phim thành công', temp);
            if (temp.length == 0) {
                return res.status(HttpStatus.NO_CONTENT).json(this.response)
            }
            return res.status(HttpStatus.OK).json(this.response)
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
    @Get("/:movieId/:genre")
    async getById(
        @Res() res,
        @Param("genre") genre: string,
        @Param("movieId") movieId: string
    ) {
        try {
            const temp = await this.commentService.getByIds(movieId, genre)
            this.logger.debug('Lấy thông tin thể loại phim thành công');
            this.response.initResponse(true, 'Lấy thông tin thể loại phim thành công', temp);
            return res.status(HttpStatus.OK).json(this.response)
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
