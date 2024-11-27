import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { LoggerService } from '../logger/logger.service';
import { Response } from '../response/response.entity';
import { CreateMovies } from './dtos/create.dtos';
import { UpdateMovies } from './dtos/update.dtos';
import { cpuUsage } from 'process';

@Controller('movies')
export class MoviesController {
    constructor(
        private readonly movieService: MoviesService,
        private readonly logger: LoggerService,
        private readonly response: Response
    ) { }
    @Post("/create")
    async create(@Res() res, @Body() createDto: CreateMovies) {
        try {
            const temp = await this.movieService.createMovie(createDto)
            this.logger.debug('Tạo phim thành công');
            this.response.initResponse(true, 'Tạo phim thành công', temp);
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
    @Put("/Update")
    async update(@Res() res, @Body() updateDto: UpdateMovies) {
        try {
            const temp = await this.movieService.updateMovie(updateDto)
            this.logger.debug('Cập nhật thông tin bộ phim thành công');
            this.response.initResponse(true, 'Cập nhật thông tin bộ phim thành công', temp);
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
    @Delete("/Delete/:id")
    async delete (@Res() res, @Param("id") id:string){
        try {
            const temp = await this.movieService.removeMovie(id)
            this.logger.debug('Xóa bỏ thông tin bộ phim thành công');
            this.response.initResponse(true, 'Xóa bỏ thông tin bộ phim thành công', temp);
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
            const temp = await this.movieService.getAll()
            this.logger.debug('Lấy toàn bộ thông tin bộ phim thành công');
            this.response.initResponse(true, 'Lấy toàn bộ thông tin bộ phim thành công', temp);
            if (temp.length==0){
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
    @Get("/:id")
    async getById(@Res() res, @Param("id") id: string) {
        try {
            const temp = await this.movieService.getById(id)
            this.logger.debug('Lấy thông tin bộ phim thành công');
            this.response.initResponse(true, 'Lấy thông tin bộ phim thành công', temp);
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
