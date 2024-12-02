import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Res,
  HttpStatus,
  HttpException,
  Put,
} from "@nestjs/common";
import { TicketsService } from "./tickets.service";
import { CreateTicketDto } from "./dto/createTicket.dto";
import { UpdateTicketDto } from "./dto/updateTicket.dto";
import { LoggerService } from "../logger/logger.service";
import { Response } from "../response/response.entity";
import { ApiOperation, ApiParam, ApiResponse } from "@nestjs/swagger";
import { UUIDv4ValidationPipe } from "src/common/pipes/validationUUIDv4.pipe";

@Controller("tickets")
export class TicketsController {
  constructor(
    private readonly ticketsService: TicketsService,
    private readonly logger: LoggerService,
    private readonly response: Response,
  ) {}

  @Post()
  @ApiOperation({
    summary: "API để tạo vé",
  })
  @ApiResponse({
    status: 201,
    description: "Tạo vé thành công",
    schema: {
      example: {
        success: true,
        message: "Tạo vé thành công",
        data: {
          id: "78f14bc2-dd45-47d4-adb1-216a0f7abc9f",
          movieId: "1ad861eb-5ba0-4432-a72c-270ef964d184",
          startTime: "2024-11-25T03:06:00.129Z",
          price: 100,
          seatId: "0ee9fc42-79d4-4a65-a928-937624b3aeb8",
          orderId: "3317511f-b767-4088-937b-1ffbf0cc80fa",
          updatedAt: "2024-12-02T12:00:20.938Z",
          createdAt: "2024-12-02T12:00:20.938Z",
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: "Dữ liệu đầu vào không hợp lệ",
    schema: {
      example: {
        success: false,
        message: "Dữ liệu đầu vào không hợp lệ",
        data: null,
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: "Lỗi hệ thống trong quá trình tạo vé",
    schema: {
      example: {
        success: false,
        message: "Lỗi hệ thống trong quá trình tạo vé",
        data: null,
      },
    },
  })
  async create(
    @Body() createTicketDto: CreateTicketDto,
    @Res() res,
  ): Promise<Response> {
    try {
      const newTicket = await this.ticketsService.create(createTicketDto);
      this.logger.debug("Tạo vé thành công");
      this.response.initResponse(true, "Tạo vé thành công", newTicket);
      return res.status(HttpStatus.CREATED).json(this.response);
    } catch (error) {
      this.logger.error("Xảy ra lỗi trong quá trình tạo vé", error.stack);
      if (error instanceof HttpException) {
        this.response.initResponse(false, error.message, null);
        return res.status(error.getStatus()).json(this.response);
      } else {
        this.response.initResponse(
          false,
          "Lỗi hệ thống trong quá trình tạo vé",
          null,
        );
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response);
      }
    }
  }

  @Get()
  @ApiOperation({
    summary: "API để lấy thông tin tất cả vé",
  })
  @ApiResponse({
    status: 200,
    description: "Tìm tất cả vé thành công",
    schema: {
      example: {
        success: true,
        message: "Tìm tất cả vé thành công",
        data: [
          {
            id: "78f14bc2-dd45-47d4-adb1-216a0f7abc9f",
            movieId: "1ad861eb-5ba0-4432-a72c-270ef964d184",
            startTime: "2024-11-25T03:06:00.129Z",
            price: 100,
            seatId: "0ee9fc42-79d4-4a65-a928-937624b3aeb8",
            orderId: "3317511f-b767-4088-937b-1ffbf0cc80fa",
            createdAt: "2024-12-02T12:00:20.938Z",
            updatedAt: "2024-12-02T12:00:20.938Z",
          },
        ],
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: "Lỗi hệ thống trong quá trình tìm vé",
    schema: {
      example: {
        success: false,
        message: "Lỗi hệ thống trong quá trình tìm vé",
        data: null,
      },
    },
  })
  async findAll(@Res() res): Promise<Response> {
    try {
      const tickets = await this.ticketsService.findAll();
      this.logger.debug("Tìm tất cả vé thành công");
      this.response.initResponse(true, "Tìm tất cả vé thành công", tickets);
      return res.status(HttpStatus.OK).json(this.response);
    } catch (error) {
      this.logger.error("Xảy ra lỗi trong quá trình tìm vé", error.stack);
      if (error instanceof HttpException) {
        this.response.initResponse(false, error.message, null);
        return res.status(error.getStatus()).json(this.response);
      } else {
        this.response.initResponse(
          false,
          "Lỗi hệ thống trong quá trình tìm vé",
          null,
        );
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response);
      }
    }
  }

  @Get(":id")
  @ApiOperation({
    summary: "API tìm kiếm thông tin của vé qua id",
    description: "Cần truyền vào id của vé dạng UUIDv4",
  })
  @ApiParam({
    name: "id",
    description: "Id của vé",
  })
  @ApiResponse({
    status: 200,
    description: "Tìm kiếm vé thành công",
    schema: {
      example: {
        success: true,
        message: "Tìm kiếm vé thành công",
        data: {
          id: "78f14bc2-dd45-47d4-adb1-216a0f7abc9f",
          movieId: "1ad861eb-5ba0-4432-a72c-270ef964d184",
          startTime: "2024-11-25T03:06:00.129Z",
          price: 100,
          seatId: "0ee9fc42-79d4-4a65-a928-937624b3aeb8",
          orderId: "3317511f-b767-4088-937b-1ffbf0cc80fa",
          createdAt: "2024-12-02T12:00:20.938Z",
          updatedAt: "2024-12-02T12:00:20.938Z",
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: "ID phải có dạng UUIDv4",
    schema: {
      example: {
        success: false,
        message: "ID phải có dạng UUIDv4",
        data: null,
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: "Lỗi hệ thống trong quá trình tìm kiếm vé",
    schema: {
      example: {
        success: false,
        message: "Lỗi hệ thống trong quá trình tìm kiếm vé",
        data: null,
      },
    },
  })
  async findOne(
    @Param("id", UUIDv4ValidationPipe) id: string,
    @Res() res,
  ): Promise<Response> {
    try {
      const ticket = await this.ticketsService.findOne(id);
      this.logger.debug("Tìm kiếm vé thành công");
      this.response.initResponse(true, "Tìm kiếm vé thành công", ticket);
      return res.status(HttpStatus.OK).json(this.response);
    } catch (error) {
      this.logger.error("Lỗi trong quá trình tìm kiếm vé", error.stack);
      if (error instanceof HttpException) {
        this.response.initResponse(false, error.message, null);
        return res.status(error.getStatus()).json(this.response);
      } else {
        this.response.initResponse(
          false,
          "Lỗi hệ thống trong quá trình tìm kiếm vé",
          null,
        );
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response);
      }
    }
  }

  @Put(":id")
  @ApiOperation({
    summary: "API cập nhật thông tin vé",
    description: "Cần truyền vào ID dạng UUIDv4 và updateTicketDto",
  })
  @ApiParam({
    name: "id",
    description: "Id của vé",
  })
  @ApiResponse({
    status: 200,
    description: "Cập nhật thông tin vé thành công",
    schema: {
      example: {
        success: true,
        message: "Cập nhật thông tin vé thành công",
        data: {
          id: "78f14bc2-dd45-47d4-adb1-216a0f7abc9f",
          movieId: "1ad861eb-5ba0-4432-a72c-270ef964d184",
          startTime: "2024-11-25T03:06:00.129Z",
          price: 200,
          seatId: "0ee9fc42-79d4-4a65-a928-937624b3aeb8",
          orderId: "3317511f-b767-4088-937b-1ffbf0cc80fa",
          createdAt: "2024-12-02T12:00:20.938Z",
          updatedAt: "2024-12-02T12:04:27.031Z",
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: "Đầu vào không hợp lệ",
    schema: {
      example: {
        success: false,
        message: "Đầu vào không hợp lệ",
        data: null,
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: "Lỗi hệ thống trong quá trình cập nhật thông tin vé",
    schema: {
      example: {
        success: false,
        message: "Lỗi hệ thống trong quá trình cập nhật thông tin vé",
        data: null,
      },
    },
  })
  async update(
    @Param("id", UUIDv4ValidationPipe) id: string,
    @Body() updateTicketDto: UpdateTicketDto,
    @Res() res,
  ) {
    try {
      const updatedTicket = await this.ticketsService.update(
        id,
        updateTicketDto,
      );
      this.logger.debug("Cập nhật thông tin vé thành công");
      this.response.initResponse(
        true,
        "Cập nhật thông tin vé thành công",
        updatedTicket,
      );
      return res.status(HttpStatus.OK).json(this.response);
    } catch (error) {
      this.logger.error(
        "Xảy ra lỗi trong quá trình cập nhật thông tin vé",
        error.stack,
      );
      if (error instanceof HttpException) {
        this.response.initResponse(false, error.message, null);
        return res.status(error.getStatus()).json(this.response);
      } else {
        this.response.initResponse(
          false,
          "Lỗi hệ thống trong quá trình cập nhật thông tin vé",
          null,
        );
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response);
      }
    }
  }

  @Delete(":id")
  @ApiOperation({
    summary: "API xóa vé",
    description: "Cần truyền vào ID dạng UUIDv4",
  })
  @ApiParam({
    name: "id",
    description: "Id của vé",
  })
  @ApiResponse({
    status: 200,
    description: "Xóa vé thành công",
    schema: {
      example: {
        success: true,
        message: "Xóa vé thành công",
        data: null,
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: "Dữ liệu đầu vào không hợp lệ",
    schema: {
      example: {
        success: false,
        message: "Dữ liệu đầu vào không hợp lệ",
        data: null,
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: "Lỗi hệ thống trong quá trình xóa vé",
    schema: {
      example: {
        success: false,
        message: "Lỗi hệ thống trong quá trình tạo lần đặt thức ăn nhanh",
        data: null,
      },
    },
  })
  async remove(@Param("id", UUIDv4ValidationPipe) id: string, @Res() res) {
    try {
      await this.ticketsService.remove(id);
      this.logger.debug("Xóa vé thành công");
      this.response.initResponse(true, "Xóa vé thành công", null);
      return res.status(HttpStatus.OK).json(this.response);
    } catch (error) {
      this.logger.error("Lỗi trong quá trình xóa vé", error.stack);
      if (error instanceof HttpException) {
        this.response.initResponse(false, error.message, null);
        return res.status(error.getStatus()).json(this.response);
      } else {
        this.response.initResponse(
          false,
          "Lỗi hệ thống trong quá trình xóa vé",
          null,
        );
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response);
      }
    }
  }
}
