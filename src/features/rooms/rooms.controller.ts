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
import { RoomsService } from "./rooms.service";
import { LoggerService } from "../logger/logger.service";
import { Response } from "../response/response.entity";
import { CreateRoomDto } from "./dtos/create.dto";
import { UpdateRoomDto } from "./dtos/update.dto";
import { ApiParam, ApiResponse } from "@nestjs/swagger";

@Controller("rooms")
export class RoomsController {
  constructor(
    private readonly roomService: RoomsService,
    private readonly logger: LoggerService,
    private readonly response: Response,
  ) {}
  @Post()
  @ApiResponse({
    status: 200,
    description: "Tạo phòng chiếu phim thành công.",
    schema: {
      example: {
        success: true,
        message: "Tạo phòng chiếu phim thành công",
        data: {
          id: "room123",
          name: "Phòng chiếu VIP",
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
  async create(@Res() res, @Body() createDto: CreateRoomDto) {
    try {
      const temp = await this.roomService.create(createDto);
      this.logger.debug("Tạo phòng chiếu phim thành công");
      this.response.initResponse(true, "Tạo phòng chiếu phim thành công", temp);
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
    description: "Cập nhật thông tin phòng chiếu phim thành công.",
    schema: {
      example: {
        success: true,
        message: "Cập nhật thông tin phòng chiếu phim thành công",
        data: {
          id: "room123",
          name: "Phòng chiếu VIP cập nhật",
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
  async update(@Res() res, @Body() updateDto: UpdateRoomDto) {
    try {
      const temp = await this.roomService.updateRoom(updateDto);
      this.logger.debug("Cập nhật thông tin phòng chiếu phim thành công");
      this.response.initResponse(
        true,
        "Cập nhật thông tin phòng chiếu phim thành công",
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
  @Delete("/:id")
  @ApiParam({ name: "id", description: "ID của phòng chiếu cần xóa" })
  @ApiResponse({
    status: 200,
    description: "Xóa phòng chiếu phim thành công.",
    schema: {
      example: {
        success: true,
        message: "Xóa phòng chiếu phim thành công",
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
  async delete(@Res() res, @Param("id") id: string) {
    try {
      const temp = await this.roomService.removeRoom(id);
      this.logger.debug("Xóa bỏ thông tin phòng chiếu phim thành công");
      this.response.initResponse(
        true,
        "Xóa bỏ thông tin phòng chiếu phim thành công",
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
    description: "Lấy toàn bộ thông tin phòng chiếu phim thành công.",
    schema: {
      example: {
        success: true,
        message: "Lấy toàn bộ thông tin phòng chiếu phim thành công",
        data: [
          {
            id: "room123",
            name: "Phòng chiếu VIP",
            updatedAt: "2024-11-28T14:04:31.171Z",
            createdAt: "2024-11-28T14:04:31.171Z",
          },
          {
            id: "room456",
            name: "Phòng chiếu tiêu chuẩn",
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
      const temp = await this.roomService.getAll();
      this.logger.debug("Lấy toàn bộ thông tin phòng chiếu phim thành công");
      this.response.initResponse(
        true,
        "Lấy toàn bộ thông tin phòng chiếu phim thành công",
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
  @Get("/:id")
  @ApiParam({ name: "id", description: "ID của phòng chiếu phim" })
  @ApiResponse({
    status: 200,
    description: "Lấy thông tin phòng chiếu phim thành công.",
    schema: {
      example: {
        success: true,
        message: "Lấy thông tin phòng chiếu phim thành công",
        data: {
          id: "room123",
          name: "Phòng chiếu VIP",
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
  async getById(@Res() res, @Param("id") id: string) {
    try {
      const temp = await this.roomService.getById(id);
      this.logger.debug("Lấy thông tin phòng chiếu phim thành công");
      this.response.initResponse(
        true,
        "Lấy thông tin phòng chiếu phim thành công",
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
