import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { ActorsService } from './actors.service';
import { LoggerService } from '../logger/logger.service';
import { Response } from '../response/response.entity';
import { createActors } from './dtos/create.dto';
import { updateActors } from './dtos/update.dto';

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
    async update(@Res() res, @Body() updateDto: updateActors) {
        try {
            const temp = await this.actorService.updateActor(updateDto)
            this.logger.debug('Cập nhật thông tin diễn viên thành công');
            this.response.initResponse(true, 'Cập nhật thông tin diễn viên thành công', temp);
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
    @Delete("/Delete/:movieId/:id")
    async delete(@Res() res, @Param("id") id: string, @Param("movieId") movieId:string) {
        try {
            const temp = await this.actorService.removeActor(movieId,id)
            this.logger.debug('Xóa bỏ thông tin diễn viên thành công');
            this.response.initResponse(true, 'Xóa bỏ thông tin diễn viên thành công', temp);
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
            const temp = await this.actorService.getAll()
            this.logger.debug('Lấy toàn bộ thông tin diễn viên thành công');
            this.response.initResponse(true, 'Lấy toàn bộ thông tin diễn viên thành công', temp);
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
    @Get("/:movieId/:id")
    async getById(@Res() res, @Param("id") id: string, @Param("movieId") movieId: string) {
        try {
            const temp = await this.actorService.getById(movieId,id)
            this.logger.debug('Lấy thông tin diễn viên thành công');
            this.response.initResponse(true, 'Lấy thông tin diễn viên thành công', temp);
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
