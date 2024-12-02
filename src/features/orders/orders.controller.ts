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
import { OrdersService } from "./orders.service";
import { CreateOrderDto } from "./dto/createOrder.dto";
import { UpdateOrderDto } from "./dto/updateOrder.dto";
import { LoggerService } from "../logger/logger.service";
import { Response } from "../response/response.entity";
import { ApiOperation, ApiParam, ApiResponse } from "@nestjs/swagger";
import { UUIDv4ValidationPipe } from "src/common/pipes/validationUUIDv4.pipe";

@Controller("orders")
export class OrdersController {
  constructor(
    private readonly ordersService: OrdersService,
    private readonly logger: LoggerService,
    private readonly response: Response,
  ) {}

  @Post()
  @ApiOperation({
    summary: "API để tạo đơn hàng",
  })
  @ApiResponse({
    status: 201,
    description: "Tạo đơn hàng thành công",
    schema: {
      example: {
        success: true,
        message: "Tạo phiếu giảm giá thành công",
        data: {
          id: "9812466d-46c8-4f2d-bd2d-7a80816f6ecb",
          isUsed: ["4f9cecc2-ae14-42f0-8548-134b8f85bfbd"],
          name: "Chào mừng bạn mới",
          expirationDate: "2024-11-27T17:56:29.279Z",
          percent: 3,
          updatedAt: "2024-12-02T12:15:49.744Z",
          createdAt: "2024-12-02T12:15:49.744Z",
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
    description: "Lỗi hệ thống trong quá trình tạo đơn hàng",
    schema: {
      example: {
        success: false,
        message: "Lỗi hệ thống trong quá trình tạo đơn hàng",
        data: null,
      },
    },
  })
  async create(
    @Body() createOrderDto: CreateOrderDto,
    @Res() res,
  ): Promise<Response> {
    try {
      const newOrder = await this.ordersService.create(createOrderDto);
      this.logger.debug("Tạo đơn hàng thành công");
      this.response.initResponse(true, "Tạo đơn hàng thành công", newOrder);
      return res.status(HttpStatus.CREATED).json(this.response);
    } catch (error) {
      this.logger.error("Xảy ra lỗi trong quá trình tạo đơn hàng", error.stack);
      if (error instanceof HttpException) {
        this.response.initResponse(false, error.message, null);
        return res.status(error.getStatus()).json(this.response);
      } else {
        this.response.initResponse(
          false,
          "Lỗi hệ thống trong quá trình tạo đơn hàng",
          null,
        );
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response);
      }
    }
  }

  @Get()
  @ApiOperation({
    summary: "API để lấy thông tin tất cả đơn hàng",
  })
  @ApiResponse({
    status: 200,
    description: "Tìm tất cả đơn hàng thành công",
    schema: {
      example: {
        success: true,
        message: "Tìm tất cả phiếu giảm giá thành công",
        data: [
          {
            id: "9812466d-46c8-4f2d-bd2d-7a80816f6ecb",
            isUsed: ["4f9cecc2-ae14-42f0-8548-134b8f85bfbd"],
            name: "Chào mừng bạn mới",
            expirationDate: "2024-11-27T17:56:29.279Z",
            percent: 3,
            createdAt: "2024-12-02T12:15:49.744Z",
            updatedAt: "2024-12-02T12:15:49.744Z",
          },
        ],
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: "Lỗi hệ thống trong quá trình tìm đơn hàng",
    schema: {
      example: {
        success: false,
        message: "Lỗi hệ thống trong quá trình tìm đơn hàng",
        data: null,
      },
    },
  })
  async findAll(@Res() res): Promise<Response> {
    try {
      const orders = await this.ordersService.findAll();
      this.logger.debug("Tìm tất cả đơn hàng thành công");
      this.response.initResponse(
        true,
        "Tìm tất cả đơn hàng thành công",
        orders,
      );
      return res.status(HttpStatus.OK).json(this.response);
    } catch (error) {
      this.logger.error("Xảy ra lỗi trong quá trình tìm đơn hàng", error.stack);
      if (error instanceof HttpException) {
        this.response.initResponse(false, error.message, null);
        return res.status(error.getStatus()).json(this.response);
      } else {
        this.response.initResponse(
          false,
          "Lỗi hệ thống trong quá trình tìm đơn hàng",
          null,
        );
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response);
      }
    }
  }

  @Get(":id")
  @ApiOperation({
    summary: "API tìm kiếm thông tin của đơn hàng qua id",
    description: "Cần truyền vào id của đơn hàng dạng UUIDv4",
  })
  @ApiParam({
    name: "id",
    description: "Id của đơn hàng",
  })
  @ApiResponse({
    status: 200,
    description: "Tìm kiếm đơn hàng thành công",
    schema: {
      example: {
        success: true,
        message: "Tìm kiếm đơn hàng thành công",
        data: {
          id: "a13963fb-51f0-41f9-a3b7-02ad38b9f5f1",
          createdTime: "2025-12-16T02:00:54.663Z",
          totalPrice: 120,
          staffId: null,
          couponId: null,
          userId: "0a895749-221e-4015-b6d5-ea66cc27ee79",
          paymentMethod: "Online",
          timePayment: null,
          paymentStatus: "Thành công",
          createdAt: "2024-11-28T14:11:57.761Z",
          updatedAt: "2024-11-28T14:11:57.761Z",
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
    description: "Lỗi hệ thống trong quá trình tìm kiếm đơn hàng",
    schema: {
      example: {
        success: false,
        message: "Lỗi hệ thống trong quá trình tìm kiếm đơn hàng",
        data: null,
      },
    },
  })
  async findOne(
    @Param("id", UUIDv4ValidationPipe) id: string,
    @Res() res,
  ): Promise<Response> {
    try {
      const order = await this.ordersService.findOne(id);
      this.logger.debug("Tìm kiếm đơn hàng thành công");
      this.response.initResponse(true, "Tìm kiếm đơn hàng thành công", order);
      return res.status(HttpStatus.OK).json(this.response);
    } catch (error) {
      this.logger.error("Lỗi trong quá trình tìm kiếm đơn hàng", error.stack);
      if (error instanceof HttpException) {
        this.response.initResponse(false, error.message, null);
        return res.status(error.getStatus()).json(this.response);
      } else {
        this.response.initResponse(
          false,
          "Lỗi hệ thống trong quá trình tìm kiếm đơn hàng",
          null,
        );
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response);
      }
    }
  }

  @Put(":id")
  @ApiOperation({
    summary: "API cập nhật thông tin đơn hàng",
    description: "Cần truyền vào ID dạng UUIDv4 và updateCouponDto",
  })
  @ApiParam({
    name: "id",
    description: "Id của đơn hàng",
  })
  @ApiResponse({
    status: 200,
    description: "Cập nhật thông tin đơn hàng thành công",
    schema: {
      example: {
        success: true,
        message: "Cập nhật thông tin đơn hàng thành công",
        data: {
          id: "a13963fb-51f0-41f9-a3b7-02ad38b9f5f1",
          createdTime: "2025-12-16T02:00:54.663Z",
          totalPrice: 120,
          staffId: null,
          couponId: null,
          userId: "0a895749-221e-4015-b6d5-ea66cc27ee79",
          paymentMethod: "Online",
          timePayment: "2024-11-28T10:14:11.522Z",
          paymentStatus: "Thành công",
          createdAt: "2024-11-28T14:11:57.761Z",
          updatedAt: "2024-12-02T12:19:05.660Z",
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
    description: "Lỗi hệ thống trong quá trình cập nhật thông tin đơn hàng",
    schema: {
      example: {
        success: false,
        message: "Lỗi hệ thống trong quá trình cập nhật thông tin đơn hàng",
        data: null,
      },
    },
  })
  async update(
    @Param("id", UUIDv4ValidationPipe) id: string,
    @Body() updateOrderDto: UpdateOrderDto,
    @Res() res,
  ) {
    try {
      const updatedOrder = await this.ordersService.update(id, updateOrderDto);
      this.logger.debug("Cập nhật thông tin đơn hàng thành công");
      this.response.initResponse(
        true,
        "Cập nhật thông tin đơn hàng thành công",
        updatedOrder,
      );
      return res.status(HttpStatus.OK).json(this.response);
    } catch (error) {
      this.logger.error(
        "Xảy ra lỗi trong quá trình cập nhật thông tin đơn hàng",
        error.stack,
      );
      if (error instanceof HttpException) {
        this.response.initResponse(false, error.message, null);
        return res.status(error.getStatus()).json(this.response);
      } else {
        this.response.initResponse(
          false,
          "Lỗi hệ thống trong quá trình cập nhật thông tin đơn hàng",
          null,
        );
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response);
      }
    }
  }

  @Delete(":id")
  @ApiOperation({
    summary: "API xóa đơn hàng",
    description: "Cần truyền vào ID dạng UUIDv4",
  })
  @ApiParam({
    name: "id",
    description: "Id của đơn hàng",
  })
  @ApiResponse({
    status: 200,
    description: "Xóa đơn hàng thành công",
    schema: {
      example: {
        success: true,
        message: "Xóa đơn hàng thành công",
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
    description: "Lỗi hệ thống trong quá trình xóa đơn hàng",
    schema: {
      example: {
        success: false,
        message: "Lỗi hệ thống trong quá trình xóa đơn hàng",
        data: null,
      },
    },
  })
  async remove(@Param("id", UUIDv4ValidationPipe) id: string, @Res() res) {
    try {
      await this.ordersService.remove(id);
      this.logger.debug("Xóa đơn hàng thành công");
      this.response.initResponse(true, "Xóa đơn hàng thành công", null);
      return res.status(HttpStatus.OK).json(this.response);
    } catch (error) {
      this.logger.error("Lỗi trong quá trình xóa đơn hàng", error.stack);
      if (error instanceof HttpException) {
        this.response.initResponse(false, error.message, null);
        return res.status(error.getStatus()).json(this.response);
      } else {
        this.response.initResponse(
          false,
          "Lỗi hệ thống trong quá trình xóa đơn hàng",
          null,
        );
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response);
      }
    }
  }
}
