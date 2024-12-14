import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpStatus,
  HttpException,
  Put,
  UseGuards,
} from "@nestjs/common";
import { BookService } from "./book.service";
import { CreateBookDto } from "./dto/createBook.dto";
import { UpdateBookDto } from "./dto/updateBook.dto";
import { LoggerService } from "../logger/logger.service";
import { Response } from "../response/response.entity";
import { ApiOperation, ApiParam, ApiResponse } from "@nestjs/swagger";
import { UUIDv4ValidationPipe } from "src/common/pipes/validationUUIDv4.pipe";
import { JwtAuthGuard } from "../auth/guards/jwt_auth.guard";
import { UserType } from "src/common/constants";
import RoleGuard from "../auth/guards/role.guard";

@Controller("books")
export class BookController {
  constructor(
    private readonly bookService: BookService,
    private readonly logger: LoggerService,
    private readonly response: Response,
  ) {}

  @UseGuards(RoleGuard(UserType.CUSTOMER))
  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({
    summary: "API để tạo lần đặt thức ăn nhanh",
  })
  @ApiResponse({
    status: 201,
    description: "Tạo lần đặt thức ăn nhanh thành công",
    schema: {
      example: {
        success: true,
        message: "Tạo lần đặt thức ăn nhanh thành công",
        data: {
          orderId: "3317511f-b767-4088-937b-1ffbf0cc80fa",
          fastfoodId: "3b00fdce-241b-456a-921e-27fb97544ec2",
          quantity: 3,
          size: "Big",
          updatedAt: "2024-12-02T08:45:43.659Z",
          createdAt: "2024-12-02T08:45:43.659Z",
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
    description: "Lỗi hệ thống trong quá trình tạo lần đặt thức ăn nhanh",
    schema: {
      example: {
        success: false,
        message: "Lỗi hệ thống trong quá trình tạo lần đặt thức ăn nhanh",
        data: null,
      },
    },
  })
  async create(
    @Body() createBookDto: CreateBookDto,
    @Res() res,
  ): Promise<Response> {
    try {
      const newBook = await this.bookService.create(createBookDto);
      this.logger.debug("Tạo lần đặt thức ăn nhanh thành công");
      this.response.initResponse(
        true,
        "Tạo lần đặt thức ăn nhanh thành công",
        newBook,
      );
      return res.status(HttpStatus.CREATED).json(this.response);
    } catch (error) {
      this.logger.error(
        "Xảy ra lỗi trong quá trình tạo thức ăn nhanh",
        error.stack,
      );
      if (error instanceof HttpException) {
        this.response.initResponse(false, error.message, null);
        return res.status(error.getStatus()).json(this.response);
      } else {
        this.response.initResponse(
          false,
          "Lỗi hệ thống trong quá trình tạo lần đặt thức ăn nhanh",
          null,
        );
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response);
      }
    }
  }

  @UseGuards(RoleGuard(UserType.CUSTOMER))
  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({
    summary: "API để lấy thông tin tất cả lần đặt thức ăn nhanh",
  })
  @ApiResponse({
    status: 200,
    description: "Tìm tất cả lần đặt thức ăn nhanh thành công",
    schema: {
      example: {
        success: true,
        message: "Tìm tất cả lần đặt thức ăn nhanh thành công",
        data: [
          {
            orderId: "3317511f-b767-4088-937b-1ffbf0cc80fa",
            fastfoodId: "3b00fdce-241b-456a-921e-27fb97544ec2",
            quantity: 3,
            size: "Big",
            createdAt: "2024-12-02T08:45:43.659Z",
            updatedAt: "2024-12-02T08:45:43.659Z",
          },
        ],
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: "Lỗi hệ thống trong quá trình tìm lần đặt thức ăn nhanh",
    schema: {
      example: {
        success: false,
        message: "Lỗi hệ thống trong quá trình tìm lần đặt thức ăn nhanh",
        data: null,
      },
    },
  })
  async findAll(@Res() res): Promise<Response> {
    try {
      const books = await this.bookService.findAll();
      this.logger.debug("Tìm tất cả lần đặt thức ăn nhanh thành công");
      this.response.initResponse(
        true,
        "Tìm tất cả lần đặt thức ăn nhanh thành công",
        books,
      );
      return res.status(HttpStatus.OK).json(this.response);
    } catch (error) {
      this.logger.error(
        "Xảy ra lỗi trong quá trình tìm thức ăn nhanh",
        error.stack,
      );
      if (error instanceof HttpException) {
        this.response.initResponse(false, error.message, null);
        return res.status(error.getStatus()).json(this.response);
      } else {
        this.response.initResponse(
          false,
          "Lỗi hệ thống trong quá trình tìm lần đặt thức ăn nhanh",
          null,
        );
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response);
      }
    }
  }

  @UseGuards(RoleGuard(UserType.CUSTOMER))
  @UseGuards(JwtAuthGuard)
  @Get(":orderId")
  @ApiOperation({
    summary:
      "API tìm kiếm thông tin của lần đặt thức ăn nhanh qua id của đơn hàng",
    description: "Cần truyền vào orderId dạng UUIDv4",
  })
  @ApiParam({
    name: "orderId",
    description: "Id của đơn hàng",
  })
  @ApiResponse({
    status: 200,
    description: "Tìm kiếm lần đặt thức ăn nhanh thành công",
    schema: {
      example: {
        success: true,
        message: "Tìm kiếm lần đặt thức ăn nhanh thành công",
        data: {
          orderId: "3317511f-b767-4088-937b-1ffbf0cc80fa",
          fastfoodId: "3b00fdce-241b-456a-921e-27fb97544ec2",
          quantity: 3,
          size: "Big",
          createdAt: "2024-12-02T08:45:43.659Z",
          updatedAt: "2024-12-02T08:45:43.659Z",
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
    description: "Lỗi hệ thống trong quá trình tìm kiếm lần đặt thức ăn nhanh",
    schema: {
      example: {
        success: false,
        message: "Lỗi hệ thống trong quá trình tìm kiếm lần đặt thức ăn nhanh",
        data: null,
      },
    },
  })
  async findOne(
    @Param("orderId", UUIDv4ValidationPipe) orderId: string,
    @Res() res,
  ): Promise<Response> {
    try {
      const book = await this.bookService.findOne(orderId);
      this.logger.debug("Tìm kiếm lần đặt thức ăn nhanh thành công");
      this.response.initResponse(
        true,
        "Tìm kiếm lần đặt thức ăn nhanh thành công",
        book,
      );
      return res.status(HttpStatus.OK).json(this.response);
    } catch (error) {
      this.logger.error(
        "Lỗi trong quá trình tìm kiếm thức ăn nhanh",
        error.stack,
      );
      if (error instanceof HttpException) {
        this.response.initResponse(false, error.message, null);
        return res.status(error.getStatus()).json(this.response);
      } else {
        this.response.initResponse(
          false,
          "Lỗi hệ thống trong quá trình tìm kiếm lần đặt thức ăn nhanh",
          null,
        );
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response);
      }
    }
  }

  @UseGuards(RoleGuard(UserType.STAFF))
  @UseGuards(JwtAuthGuard)
  @Put(":orderId")
  @ApiOperation({
    summary: "API cập nhật thông tin lần đặt thức ăn nhanh",
    description: "Cần truyền vào orderId dạng UUIDv4 và updateBookDto",
  })
  @ApiParam({
    name: "orderId",
    description: "Id của order",
  })
  @ApiResponse({
    status: 200,
    description: "Cập nhật thông tin lần đặt thức ăn nhanh thành công",
    schema: {
      example: {
        success: true,
        message: "Cập nhật thông tin lần đặt thức ăn nhanh thành công",
        data: {
          orderId: "3317511f-b767-4088-937b-1ffbf0cc80fa",
          fastfoodId: "3b00fdce-241b-456a-921e-27fb97544ec2",
          quantity: 4,
          size: "Big",
          createdAt: "2024-12-02T08:45:43.659Z",
          updatedAt: "2024-12-02T11:50:11.132Z",
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
    description:
      "Lỗi hệ thống trong quá trình cập nhật thông tin lần đặt thức ăn nhanh",
    schema: {
      example: {
        success: false,
        message:
          "Lỗi hệ thống trong quá trình cập nhật thông tin lần đặt thức ăn nhanh",
        data: null,
      },
    },
  })
  async update(
    @Param("orderId", UUIDv4ValidationPipe) orderId: string,
    @Body() updateBookDto: UpdateBookDto,
    @Res() res,
  ) {
    try {
      const updatedBook = await this.bookService.update(orderId, updateBookDto);
      this.logger.debug("Cập nhật thông tin lần đặt thức ăn nhanh thành công");
      this.response.initResponse(
        true,
        "Cập nhật thông tin lần đặt thức ăn nhanh thành công",
        updatedBook,
      );
      return res.status(HttpStatus.OK).json(this.response);
    } catch (error) {
      this.logger.error(
        "Xảy ra lỗi trong quá trình cập nhật thông tin thức ăn nhanh",
        error.stack,
      );
      if (error instanceof HttpException) {
        this.response.initResponse(false, error.message, null);
        return res.status(error.getStatus()).json(this.response);
      } else {
        this.response.initResponse(
          false,
          "Lỗi hệ thống trong quá trình cập nhật thông tin lần đặt thức ăn nhanh",
          null,
        );
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response);
      }
    }
  }

  @UseGuards(RoleGuard(UserType.STAFF))
  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  @ApiOperation({
    summary: "API xóa lần đặt thức ăn nhanh",
    description: "Cần truyền vào ID dạng UUIDv4",
  })
  @ApiParam({
    name: "id",
    description: "Id của lần đặt thức ăn nhanh",
  })
  @ApiResponse({
    status: 200,
    description: "Xóa lần đặt thức ăn nhanh thành công",
    schema: {
      example: {
        success: true,
        message: "Xóa lần đặt thức ăn nhanh thành công",
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
    description: "Lỗi hệ thống trong quá trình xóa lần đặt thức ăn nhanh",
    schema: {
      example: {
        success: false,
        message: "Lỗi hệ thống trong quá trình xóa lần đặt thức ăn nhanh",
        data: null,
      },
    },
  })
  async remove(@Param("id", UUIDv4ValidationPipe) id: string, @Res() res) {
    try {
      await this.bookService.remove(id);
      this.logger.debug("Xóa lần đặt thức ăn nhanh thành công");
      this.response.initResponse(
        true,
        "Xóa lần đặt thức ăn nhanh thành công",
        null,
      );
      return res.status(HttpStatus.OK).json(this.response);
    } catch (error) {
      this.logger.error("Lỗi trong quá trình xóa thức ăn nhanh", error.stack);
      if (error instanceof HttpException) {
        this.response.initResponse(false, error.message, null);
        return res.status(error.getStatus()).json(this.response);
      } else {
        this.response.initResponse(
          false,
          "Lỗi hệ thống trong quá trình xóa lần đặt thức ăn nhanh",
          null,
        );
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response);
      }
    }
  }
}
