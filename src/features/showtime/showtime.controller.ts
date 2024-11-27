import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { Response } from '../response/response.entity';
import { LoggerService } from '../logger/logger.service';
import { ShowtimeService } from './showtime.service';
import { CreateShowtimeDto } from './dtos/create.dto';
import { UpdateShowtimeDto } from './dtos/update.dto';

@Controller('showtime')
export class ShowtimeController {
    constructor(
        private readonly showtimeService: ShowtimeService,
        private readonly logger: LoggerService,
        private readonly response: Response
    ) { }
    @Post("/create")
    async getHello(@Res() res, @Body() createDto: CreateShowtimeDto) {
        try {
            const temp = await this.showtimeService.create(createDto)
            this.logger.debug('Tạo suất chiếu thành công');
            this.response.initResponse(true, 'Tạo suất chiếu thành công', temp);
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
    async update(@Res() res, @Body() updateDto: UpdateShowtimeDto) {
        try {
            const temp = await this.showtimeService.updateShowtime(updateDto)
            this.logger.debug('Cập nhật thông tin suất chiếu thành công');
            this.response.initResponse(true, 'Cập nhật thông tin suất chiếu thành công', temp);
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
    @Delete("/:userId/:movieId")
    async delete(
        @Res() res,
        @Param("userId") userId: string,
        @Param("movieId") movieId: string
    ) {
        try {
            const temp = await this.showtimeService.removeShowtime(userId, movieId)
            this.logger.debug('Xóa bỏ thông tin suất chiếu thành công');
            this.response.initResponse(true, 'Xóa bỏ thông tin suất chiếu thành công', temp);
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
            const temp = await this.showtimeService.getAll()
            this.logger.debug('Lấy toàn bộ thông tin suất chiếu thành công');
            this.response.initResponse(true, 'Lấy toàn bộ thông tin suất chiếu thành công', temp);
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
    @Get("/:id")
    async getById(
        @Res() res,
        @Param("userId") userId: string,
        @Param("movieId") movieId: string
    ) {
        try {
            const temp = await this.showtimeService.getByIds(userId, movieId)
            this.logger.debug('Lấy thông tin suất chiếu thành công');
            this.response.initResponse(true, 'Lấy thông tin suất chiếu thành công', temp);
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
