import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
  Param,
  Post,
  Put,
  Res,
  UseGuards,
} from "@nestjs/common";
import { Response } from "../response/response.entity";
import { LoggerService } from "../logger/logger.service";
import { ShowtimeService } from "./showtime.service";
import { CreateShowtimeDto } from "./dtos/create.dto";
import { UpdateShowtimeDto } from "./dtos/update.dto";
import { ApiOperation, ApiParam, ApiResponse } from "@nestjs/swagger";
import { UUIDv4ValidationPipe } from "src/common/pipes/validationUUIDv4.pipe";
import RoleGuard from "../auth/guards/role.guard";
import { UserType } from "src/common/constants";
import { JwtAuthGuard } from "../auth/guards/jwt_auth.guard";

@Controller("showtime")
export class ShowtimeController {
  constructor(
    private readonly showtimeService: ShowtimeService,
    private readonly logger: LoggerService,
    private readonly response: Response,
  ) {}

  @UseGuards(RoleGuard(UserType.STAFF))
  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiResponse({
    status: 200,
    description: "Tạo suất chiếu thành công.",
    schema: {
      example: {
        success: true,
        message: "Tạo suất chiếu thành công",
        data: {
          movieId: "movie123",
          startTime: "2024-12-01T10:30:00Z",
          roomId: "roomA",
          updatedAt: "2024-11-28T14:04:31.171Z",
          createdAt: "2024-11-28T14:04:31.171Z",
        },
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: "Lỗi trong quá trình.",
    schema: {
      example: {
        success: false,
        message: "Lỗi trong quá trình..",
        data: null,
      },
    },
  })
  async create(@Res() res, @Body() createDto: CreateShowtimeDto) {
    try {
      const temp = await this.showtimeService.create(createDto);
      this.logger.debug("Tạo suất chiếu thành công");
      this.response.initResponse(true, "Tạo suất chiếu thành công", temp);
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

  @UseGuards(RoleGuard(UserType.STAFF))
  @UseGuards(JwtAuthGuard)
  @Put()
  @ApiResponse({
    status: 200,
    description: "Cập nhật suất chiếu thành công.",
    schema: {
      example: {
        success: true,
        message: "Cập nhật suất chiếu thành công",
        data: {
          movieId: "movie123",
          startTime: "2024-12-02T14:00:00Z",
          roomId: "roomB",
          updatedAt: "2024-11-28T14:04:31.171Z",
          createdAt: "2024-11-28T14:04:31.171Z",
        },
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: "Lỗi trong quá trình.",
    schema: {
      example: {
        success: false,
        message: "Lỗi trong quá trình..",
        data: null,
      },
    },
  })
  async update(@Res() res, @Body() updateDto: UpdateShowtimeDto) {
    try {
      const temp = await this.showtimeService.updateShowtime(updateDto);
      this.logger.debug("Cập nhật thông tin suất chiếu thành công");
      this.response.initResponse(
        true,
        "Cập nhật thông tin suất chiếu thành công",
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

  @UseGuards(RoleGuard(UserType.STAFF))
  @UseGuards(JwtAuthGuard)
  @Delete("/:userId/:movieId")
  @ApiParam({ name: "userId", description: "ID của người dùng" })
  @ApiParam({ name: "movieId", description: "ID của bộ phim" })
  @ApiResponse({
    status: 200,
    description: "Xóa suất chiếu thành công.",
    schema: {
      example: {
        success: true,
        message: "Xóa suất chiếu thành công",
        data: [],
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: "Lỗi trong quá trình.",
    schema: {
      example: {
        success: false,
        message: "Lỗi trong quá trình..",
        data: null,
      },
    },
  })
  async delete(
    @Res() res,
    @Param("roomId") roomId: string,
    @Param("movieId") movieId: string,
  ) {
    try {
      const temp = await this.showtimeService.removeShowtime(roomId, movieId);
      this.logger.debug("Xóa bỏ thông tin suất chiếu thành công");
      this.response.initResponse(
        true,
        "Xóa bỏ thông tin suất chiếu thành công",
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

  @UseGuards(RoleGuard(UserType.CUSTOMER))
  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiResponse({
    status: 200,
    description: "Lấy toàn bộ suất chiếu thành công.",
    schema: {
      example: {
        success: true,
        message: "Lấy toàn bộ suất chiếu thành công",
        data: [
          {
            movieId: "movie123",
            startTime: "2024-12-01T10:30:00Z",
            roomId: "roomA",
            updatedAt: "2024-11-28T14:04:31.171Z",
            createdAt: "2024-11-28T14:04:31.171Z",
          },
          {
            movieId: "movie456",
            startTime: "2024-12-02T14:00:00Z",
            roomId: "roomB",
            updatedAt: "2024-11-28T14:04:31.171Z",
            createdAt: "2024-11-28T14:04:31.171Z",
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
  async getAll(@Res() res) {
    try {
      const temp = await this.showtimeService.getAll();
      this.logger.debug("Lấy toàn bộ thông tin suất chiếu thành công");
      this.response.initResponse(
        true,
        "Lấy toàn bộ thông tin suất chiếu thành công",
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

  @UseGuards(RoleGuard(UserType.CUSTOMER))
  @UseGuards(JwtAuthGuard)
  @Get("/:roomId/:movieId")
  @ApiParam({ name: "roomId", description: "ID của phòng chiếu" })
  @ApiParam({ name: "movieId", description: "ID của bộ phim" })
  @ApiResponse({
    status: 200,
    description: "Lấy thông tin suất chiếu thành công.",
    schema: {
      example: {
        success: true,
        message: "Lấy thông tin suất chiếu thành công",
        data: {
          movieId: "movie123",
          startTime: "2024-12-01T10:30:00Z",
          roomId: "roomA",
          updatedAt: "2024-11-28T14:04:31.171Z",
          createdAt: "2024-11-28T14:04:31.171Z",
        },
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: "Lỗi trong quá trình.",
    schema: {
      example: {
        success: false,
        message: "Lỗi trong quá trình..",
        data: null,
      },
    },
  })
  async getById(
    @Res() res,
    @Param("roomId") roomId: string,
    @Param("movieId") movieId: string,
  ) {
    try {
      const temp = await this.showtimeService.getByIds(roomId, movieId);
      this.logger.debug("Lấy thông tin suất chiếu thành công");
      this.response.initResponse(
        true,
        "Lấy thông tin suất chiếu thành công",
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

  @UseGuards(RoleGuard(UserType.CUSTOMER))
  @UseGuards(JwtAuthGuard)
  @Get(":movieId")
  @ApiOperation({
    summary: "API tìm kiếm thông tin các suất chiếu của phim qua movieId",
    description: "Cần truyền vào id của phim dạng UUIDv4",
  })
  @ApiResponse({
    status: 200,
    description: "Lấy toàn bộ thông tin suất chiếu theo phim thành công.",
    schema: {
      example: {
        success: true,
        message: "Lấy toàn bộ thông tin suất chiếu theo phim thành công",
        data: [
          {
            movieId: "d49fb6f7-43fb-452a-a871-182e7681b656",
            startTime: "2024-12-12T15:00:00.192Z",
            endTime: "2024-12-12T16:00:00.192Z",
            roomId: 1,
            createdAt: "2024-12-12T10:35:57.678Z",
            updatedAt: "2024-12-12T10:36:00.743Z",
          },
          {
            movieId: "d49fb6f7-43fb-452a-a871-182e7681b656",
            startTime: "2024-12-12T12:00:00.192Z",
            endTime: "2024-12-12T13:30:00.192Z",
            roomId: 2,
            createdAt: "2024-12-12T10:35:57.678Z",
            updatedAt: "2024-12-12T10:36:00.747Z",
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
  async getByMovieId(
    @Res() res,
    @Param("movieId", UUIDv4ValidationPipe) movieId: string,
  ) {
    try {
      const temp = await this.showtimeService.getByMovie(movieId);
      this.logger.debug(
        "Lấy toàn bộ thông tin suất chiếu theo phim thành công",
      );
      this.response.initResponse(
        true,
        "Lấy toàn bộ thông tin suất chiếu theo phim thành công",
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
        this.response.initResponse(
          false,
          "Lỗi trong quá trình lấy thông tin suất chiếu theo phimphim",
          null,
        );
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response);
      }
    }
  }
}
