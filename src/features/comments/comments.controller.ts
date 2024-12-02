import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from "@nestjs/common";
import { CommentsService } from "./comments.service";
import { Response } from "../response/response.entity";
import { CreateCommentDto } from "./dto/create.dto";
import { updateCommentDto } from "./dto/update.dto";
import { LoggerService } from "../logger/logger.service";
import { ApiParam, ApiResponse } from "@nestjs/swagger";

@Controller("comments")
export class CommentsController {
  constructor(
    private readonly commentService: CommentsService,
    private readonly logger: LoggerService,
    private readonly response: Response,
  ) {}
  @Post()
  @ApiResponse({
    status: 200,
    description: "Tạo bình luận thành công.",
    schema: {
      example: {
        success: true,
        message: "Tạo bình luận thành công",
        data: {
          movieId: "movie123",
          userId: "user456",
          commentTime: "2024-11-28T14:00:00.000Z",
          comment: "Đây là bình luận của tôi về bộ phim này.",
          createdAt: "2024-11-28T14:04:31.171Z",
          updatedAt: "2024-11-28T14:04:31.171Z",
        },
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: "Lỗi khi tạo bình luận.",
    schema: {
      example: {
        success: false,
        message: "Lỗi trong quá trình.",
        data: null,
      },
    },
  })
  async create(@Res() res, @Body() createDto: CreateCommentDto) {
    try {
      const temp = await this.commentService.create(createDto);
      this.logger.debug("Tạo bình luận thành công");
      this.response.initResponse(true, "Tạo bình luận thành công", temp);
      return res.status(HttpStatus.OK).json(this.response);
    } catch (error) {
      this.logger.error(error.message, error.stack);
      if (error instanceof HttpException) {
        this.response.initResponse(false, error.message, null);
        return res.status(error.getStatus()).json(this.response);
      } else {
        this.response.initResponse(false, "Lỗi trong quá trình..", null);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response);
      }
    }
  }
  @Put()
  @ApiResponse({
    status: 200,
    description: "Cập nhật bình luận thành công.",
    schema: {
      example: {
        success: true,
        message: "Cập nhật bình luận thành công",
        data: {
          movieId: "movie123",
          userId: "user456",
          commentTime: "2024-11-28T15:00:00.000Z",
          comment: "Tôi đã chỉnh sửa bình luận của mình.",
          createdAt: "2024-11-28T14:04:31.171Z",
          updatedAt: "2024-11-28T14:04:31.171Z",
        },
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: "Lỗi khi cập nhật bình luận.",
    schema: {
      example: {
        success: false,
        message: "Lỗi trong quá trình.",
        data: null,
      },
    },
  })
  async update(@Res() res, @Body() updateDto: updateCommentDto) {
    try {
      const temp = await this.commentService.updateComment(updateDto);
      this.logger.debug("Cập nhật thông tin bình luận thành công");
      this.response.initResponse(
        true,
        "Cập nhật thông tin bình luận thành công",
        temp,
      );
      return res.status(HttpStatus.OK).json(this.response);
    } catch (error) {
      this.logger.error(error.message, error.stack);
      if (error instanceof HttpException) {
        this.response.initResponse(false, error.message, null);
        return res.status(error.getStatus()).json(this.response);
      } else {
        this.response.initResponse(false, "Lỗi trong quá trình..", null);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response);
      }
    }
  }
  @Delete("/:userId/:movieId")
  @ApiParam({
    name: "userId",
    description: "ID của người dùng",
    example: "user456",
  })
  @ApiParam({
    name: "movieId",
    description: "ID của bộ phim",
    example: "movie123",
  })
  @ApiResponse({
    status: 200,
    description: "Xóa bình luận thành công.",
    schema: {
      example: {
        success: true,
        message: "Xóa bình luận thành công",
        data: [],
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: "Lỗi khi xóa bình luận.",
    schema: {
      example: {
        success: false,
        message: "Lỗi trong quá trình.",
        data: null,
      },
    },
  })
  async delete(
    @Res() res,
    @Param("userId") userId: string,
    @Param("movieId") movieId: string,
  ) {
    try {
      const temp = await this.commentService.removeComment(userId, movieId);
      this.logger.debug("Xóa bỏ thông tin bình luận thành công");
      this.response.initResponse(
        true,
        "Xóa bỏ thông tin bình luận thành công",
        temp,
      );
      return res.status(HttpStatus.OK).json(this.response);
    } catch (error) {
      this.logger.error(error.message, error.stack);
      if (error instanceof HttpException) {
        this.response.initResponse(false, error.message, null);
        return res.status(error.getStatus()).json(this.response);
      } else {
        this.response.initResponse(false, "Lỗi trong quá trình..", null);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response);
      }
    }
  }
  @Get()
  @ApiResponse({
    status: 200,
    description: "Lấy danh sách bình luận thành công.",
    schema: {
      example: {
        success: true,
        message: "Lấy toàn bộ thông tin bình luận thành công",
        data: [
          {
            movieId: "movie123",
            userId: "user456",
            commentTime: "2024-11-28T14:00:00.000Z",
            comment: "Bình luận thứ nhất. I;m crazy Boiiii",
            createdAt: "2024-11-28T14:04:31.171Z",
            updatedAt: "2024-11-28T14:04:31.171Z",
          },
          {
            movieId: "movie124",
            userId: "user457",
            commentTime: "2024-11-28T15:00:00.000Z",
            comment: "Bình luận thứ hai. Hello world my name is BABYBOOO",
            createdAt: "2024-11-28T14:04:31.171Z",
            updatedAt: "2024-11-28T14:04:31.171Z",
          },
        ],
      },
    },
  })
  @ApiResponse({
    status: 204,
    description: "Không có dữ liệu.",
    schema: {
      example: {
        success: true,
        message: "Không có dữ liệu",
        data: [],
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: "Lỗi khi lấy danh sách bình luận.",
    schema: {
      example: {
        success: false,
        message: "Lỗi trong quá trình.",
        data: null,
      },
    },
  })
  async getAll(@Res() res) {
    try {
      const temp = await this.commentService.getAll();
      this.logger.debug("Lấy toàn bộ thông tin bình luận thành công");
      this.response.initResponse(
        true,
        "Lấy toàn bộ thông tin bình luận thành công",
        temp,
      );
      if (temp.length == 0) {
        return res.status(HttpStatus.NO_CONTENT).json(this.response);
      }
      return res.status(HttpStatus.OK).json(this.response);
    } catch (error) {
      this.logger.error(error.message, error.stack);
      if (error instanceof HttpException) {
        this.response.initResponse(false, error.message, null);
        return res.status(error.getStatus()).json(this.response);
      } else {
        this.response.initResponse(false, "Lỗi trong quá trình..", null);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response);
      }
    }
  }
  @Get("/:userId/:movieId")
  @ApiParam({
    name: "userId",
    description: "ID của người dùng",
    example: "user456",
  })
  @ApiParam({
    name: "movieId",
    description: "ID của bộ phim",
    example: "movie123",
  })
  @ApiResponse({
    status: 200,
    description: "Lấy thông tin bình luận thành công.",
    schema: {
      example: {
        success: true,
        message: "Lấy thông tin bình luận thành công",
        data: {
          movieId: "movie123",
          userId: "user456",
          commentTime: "2024-11-28T14:00:00.000Z",
          comment: "Đây là bình luận của tôi.",
          createdAt: "2024-11-28T14:04:31.171Z",
          updatedAt: "2024-11-28T14:04:31.171Z",
        },
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: "Lỗi khi lấy thông tin bình luận.",
    schema: {
      example: {
        success: false,
        message: "Lỗi trong quá trình.",
        data: null,
      },
    },
  })
  async getById(
    @Res() res,
    @Param("userId") userId: string,
    @Param("movieId") movieId: string,
  ) {
    try {
      const temp = await this.commentService.getByIds(userId, movieId);
      this.logger.debug("Lấy thông tin bình luận thành công");
      this.response.initResponse(
        true,
        "Lấy thông tin bình luận thành công",
        temp,
      );
      return res.status(HttpStatus.OK).json(this.response);
    } catch (error) {
      this.logger.error(error.message, error.stack);
      if (error instanceof HttpException) {
        this.response.initResponse(false, error.message, null);
        return res.status(error.getStatus()).json(this.response);
      } else {
        this.response.initResponse(false, "Lỗi trong quá trình..", null);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response);
      }
    }
  }
}
