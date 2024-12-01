import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { LoggerService } from '../logger/logger.service';
import { Response } from '../response/response.entity';
import { CreateMovies } from './dtos/create.dtos';
import { UpdateMovies } from './dtos/update.dtos';
import { cpuUsage } from 'process';
import { ApiParam, ApiResponse } from '@nestjs/swagger';

@Controller('movies')
export class MoviesController {
    constructor(
        private readonly movieService: MoviesService,
        private readonly logger: LoggerService,
        private readonly response: Response
    ) { }
    @Post("/create")
    @ApiResponse({
        status: 200,
        description: 'Tạo phim thành công.',
        schema: {
            example: {
                success: true,
                message: 'Tạo phim thành công',
                data: {
                    id: "abc123",
                    name: "Tên phim mẫu",
                    publishDay: "2024-11-29",
                    length: 120,
                    ageLimitation: 13,
                    country: "Việt Nam",
                    description: "Mô tả chi tiết nội dung phim.",
                    updatedAt: "2024-11-28T14:04:31.171Z",
                    createdAt: "2024-11-28T14:04:31.171Z"
                }
            }
        }
    })
    @ApiResponse({
        status: 500,
        description: 'Lỗi trong quá trình.',
        schema: {
            example: {
                success: false,
                message: 'Lỗi trong quá trình..',
                data: null
            }
        }
    })
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
    @ApiResponse({
        status: 200,
        description: 'Cập nhật thông tin bộ phim thành công.',
        schema: {
            example: {
                success: true,
                message: 'Cập nhật thông tin bộ phim thành công',
                data: {
                    id: "abc123",
                    name: "Tên phim mới",
                    publishDay: "2024-11-30",
                    length: 130,
                    ageLimitation: 16,
                    country: "Hoa Kỳ",
                    description: "Mô tả mới chi tiết nội dung phim.",
                    updatedAt: "2024-11-28T14:04:31.171Z",
                    createdAt: "2024-11-28T14:04:31.171Z"
                }
            }
        }
    })
    @ApiResponse({
        status: 500,
        description: 'Lỗi trong quá trình.',
        schema: {
            example: {
                success: false,
                message: 'Lỗi trong quá trình..',
                data: null
            }
        }
    })
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
    @ApiParam({ name: 'id', description: 'ID của bộ phim cần xóa' })
    @ApiResponse({
        status: 200,
        description: 'Xóa bỏ thông tin bộ phim thành công.',
        schema: {
            example: {
                success: true,
                message: 'Xóa bỏ thông tin bộ phim thành công',
                data: []
            }
        }
    })
    @ApiResponse({
        status: 500,
        description: 'Lỗi trong quá trình.',
        schema: {
            example: {
                success: false,
                message: 'Lỗi trong quá trình..',
                data: null
            }
        }
    })
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
    @ApiResponse({
        status: 200,
        description: 'Lấy toàn bộ thông tin bộ phim thành công.',
        schema: {
            example: {
                success: true,
                message: 'Lấy toàn bộ thông tin bộ phim thành công',
                data: [
                    {
                        id: "abc123",
                        name: "Tên phim 1",
                        publishDay: "2024-11-29",
                        length: 120,
                        ageLimitation: 13,
                        country: "Việt Nam",
                        description: "Mô tả chi tiết nội dung phim 1.",
                        updatedAt: "2024-11-28T14:04:31.171Z",
                        createdAt: "2024-11-28T14:04:31.171Z"
                    },
                    {
                        id: "def456",
                        name: "Tên phim 2",
                        publishDay: "2024-12-01",
                        length: 90,
                        ageLimitation: 18,
                        country: "Nhật Bản",
                        description: "Mô tả chi tiết nội dung phim 2.",
                        updatedAt: "2024-11-28T14:04:31.171Z",
                        createdAt: "2024-11-28T14:04:31.171Z"
                    }
                ]
            }
        }
    })
    @ApiResponse({
        status: 204,
        description: 'Không có dữ liệu.',
        schema: {
            example: {
                success: true,
                message: 'Không có dữ liệu',
                data: []
            }
        }
    })
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
    @ApiParam({ name: 'id', description: 'ID của bộ phim' })
    @ApiResponse({
        status: 200,
        description: 'Lấy thông tin bộ phim thành công.',
        schema: {
            example: {
                success: true,
                message: 'Lấy thông tin bộ phim thành công',
                data: {
                    id: "abc123",
                    name: "Tên phim mẫu",
                    publishDay: "2024-11-29",
                    length: 120,
                    ageLimitation: 13,
                    country: "Việt Nam",
                    description: "Mô tả chi tiết nội dung phim.",
                    updatedAt: "2024-11-28T14:04:31.171Z",
                    createdAt: "2024-11-28T14:04:31.171Z"
                }
            }
        }
    })
    @ApiResponse({
        status: 500,
        description: 'Lỗi trong quá trình.',
        schema: {
            example: {
                success: false,
                message: 'Lỗi trong quá trình..',
                data: null
            }
        }
    })
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
