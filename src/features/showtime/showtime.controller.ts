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
} from "@nestjs/common";
import { Response } from "../response/response.entity";
import { LoggerService } from "../logger/logger.service";
import { ShowtimeService } from "./showtime.service";
import { CreateShowtimeDto } from "./dtos/create.dto";
import { UpdateShowtimeDto } from "./dtos/update.dto";
import { ApiParam, ApiResponse } from "@nestjs/swagger";
import * as dayjs from "dayjs";

@Controller("showtime")
export class ShowtimeController {
  constructor(
    private readonly showtimeService: ShowtimeService,
    private readonly logger: LoggerService,
    private readonly response: Response,
  ) {}
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
  @Get("/:movieId")
  async getMovieByMovieId(@Param("movieId") movieId: string) {
    try {
      const showTimes =
        await this.showtimeService.getShowTimeByMovieId(movieId);

      // Nhóm lịch chiếu theo ngày
      const groupedShowtimes = showTimes.reduce((result, showtime) => {
        const day = dayjs(showtime.startTime).format("DD/MM/YYYY"); // Định dạng ngày
        const timeObject = {
          time: dayjs(showtime.startTime).format("hh:mm A"), // Định dạng giờ
          roomId: showtime.roomId, // Lấy roomId từ showtime
        };

        // Nếu đã có ngày này trong nhóm, thêm đối tượng {time, roomId} vào mảng
        if (result[day]) {
          result[day].push(timeObject);
        } else {
          // Nếu chưa có, khởi tạo ngày và mảng chứa {time, roomId}
          result[day] = [timeObject];
        }
        return result;
      }, {});

      // Chuyển đổi đối tượng groupedShowtimes thành mảng object
      const response = Object.entries(groupedShowtimes).map(([day, times]) => ({
        day,
        times,
      }));

      return response;
    } catch (error) {
      throw new InternalServerErrorException(
        "Xảy ra lỗi trong quá trình lấy lịch chiếu của phim",
      );
    }
  }
}
