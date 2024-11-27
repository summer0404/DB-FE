import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { Response } from '../response/response.entity';
import { CreateCommentDto } from './dto/create.dto';
import { updateCommentDto } from './dto/update.dto';
import { LoggerService } from '../logger/logger.service';

@Controller('comments')
export class CommentsController {
    constructor(
        private readonly commentService: CommentsService,
        private readonly logger: LoggerService,
        private readonly response: Response
    ) { }
    @Post("/create")
    async getHello(@Res() res, @Body() createDto: CreateCommentDto) {
        try {
            const temp = await this.commentService.create(createDto)
            this.logger.debug('Tạo bình luận thành công');
            this.response.initResponse(true, 'Tạo bình luận thành công', temp);
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
    async update(@Res() res, @Body() updateDto: updateCommentDto) {
        try {
            const temp = await this.commentService.updateComment(updateDto)
            this.logger.debug('Cập nhật thông tin bình luận thành công');
            this.response.initResponse(true, 'Cập nhật thông tin bình luận thành công', temp);
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
        @Param("movieId") movieId:string
    ) {
        try {
            const temp = await this.commentService.removeComment(userId, movieId)
            this.logger.debug('Xóa bỏ thông tin bình luận thành công');
            this.response.initResponse(true, 'Xóa bỏ thông tin bình luận thành công', temp);
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
            this.logger.debug('Lấy toàn bộ thông tin bình luận thành công');
            this.response.initResponse(true, 'Lấy toàn bộ thông tin bình luận thành công', temp);
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
    @Get("/:userId/:movieId")
    async getById(
        @Res() res,
        @Param("userId") userId: string,
        @Param("movieId") movieId: string
    ) {
        try {
            const temp = await this.commentService.getByIds(userId, movieId)
            this.logger.debug('Lấy thông tin bình luận thành công');
            this.response.initResponse(true, 'Lấy thông tin bình luận thành công', temp);
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
