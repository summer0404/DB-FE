import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { LoggerService } from '../logger/logger.service';
import { Response } from '../response/response.entity';
import { CreateRoomDto } from './dtos/create.dto';
import { UpdateRoomDto } from './dtos/update.dto';

@Controller('rooms')
export class RoomsController {
    constructor(
        private readonly roomService: RoomsService,
        private readonly logger: LoggerService,
        private readonly response: Response
    ) { }
    @Post("/create")
    async getHello(@Res() res, @Body() createDto: CreateRoomDto) {
        try {
            const temp = await this.roomService.create(createDto)
            this.logger.debug('Tạo phòng chiếu phim thành công');
            this.response.initResponse(true, 'Tạo phòng chiếu phim thành công', temp);
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
    async update(@Res() res, @Body() updateDto: UpdateRoomDto) {
        try {
            const temp = await this.roomService.updateRoom(updateDto)
            this.logger.debug('Cập nhật thông tin phòng chiếu phim thành công');
            this.response.initResponse(true, 'Cập nhật thông tin phòng chiếu phim thành công', temp);
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
    async delete(@Res() res, @Param("id") id: string) {
        try {
            const temp = await this.roomService.removeRoom(id)
            this.logger.debug('Xóa bỏ thông tin phòng chiếu phim thành công');
            this.response.initResponse(true, 'Xóa bỏ thông tin phòng chiếu phim thành công', temp);
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
            const temp = await this.roomService.getAll()
            this.logger.debug('Lấy toàn bộ thông tin phòng chiếu phim thành công');
            this.response.initResponse(true, 'Lấy toàn bộ thông tin phòng chiếu phim thành công', temp);
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
    async getById(@Res() res, @Param("id") id: string) {
        try {
            const temp = await this.roomService.getById(id)
            this.logger.debug('Lấy thông tin phòng chiếu phim thành công');
            this.response.initResponse(true, 'Lấy thông tin phòng chiếu phim thành công', temp);
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
