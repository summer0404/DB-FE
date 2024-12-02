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
import { CouponsService } from "./coupons.service";
import { CreateCouponDto } from "./dto/createCoupon.dto";
import { UpdateCouponDto } from "./dto/updateCoupon.dto";
import { LoggerService } from "../logger/logger.service";
import { Response } from "../response/response.entity";
import { ApiOperation, ApiParam, ApiResponse } from "@nestjs/swagger";
import { UUIDv4ValidationPipe } from "src/common/pipes/validationUUIDv4.pipe";

@Controller("coupons")
export class CouponsController {
  constructor(
    private readonly couponsService: CouponsService,
    private readonly logger: LoggerService,
    private readonly response: Response,
  ) {}

  @Post()
  @ApiOperation({
    summary: "API để tạo phiếu giảm giá",
  })
  @ApiResponse({
    status: 201,
    description: "Tạo phiếu giảm giá thành công",
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
    description: "Lỗi hệ thống trong quá trình tạo phiếu giảm giá",
    schema: {
      example: {
        success: false,
        message: "Lỗi hệ thống trong quá trình tạo phiếu giảm giá",
        data: null,
      },
    },
  })
  async create(
    @Body() createCouponDto: CreateCouponDto,
    @Res() res,
  ): Promise<Response> {
    try {
      const newCoupon = await this.couponsService.create(createCouponDto);
      this.logger.debug("Tạo phiếu giảm giá thành công");
      this.response.initResponse(
        true,
        "Tạo phiếu giảm giá thành công",
        newCoupon,
      );
      return res.status(HttpStatus.CREATED).json(this.response);
    } catch (error) {
      this.logger.error(
        "Xảy ra lỗi trong quá trình tạo phiếu giảm giá",
        error.stack,
      );
      if (error instanceof HttpException) {
        this.response.initResponse(false, error.message, null);
        return res.status(error.getStatus()).json(this.response);
      } else {
        this.response.initResponse(
          false,
          "Lỗi hệ thống trong quá trình tạo phiếu giảm giá",
          null,
        );
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response);
      }
    }
  }

  @Get()
  @ApiOperation({
    summary: "API để lấy thông tin tất cả phiếu giảm giá",
  })
  @ApiResponse({
    status: 200,
    description: "Tìm tất cả phiếu giảm giá thành công",
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
    description: "Lỗi hệ thống trong quá trình tìm phiếu giảm giá",
    schema: {
      example: {
        success: false,
        message: "Lỗi hệ thống trong quá trình tìm phiếu giảm giá",
        data: null,
      },
    },
  })
  async findAll(@Res() res): Promise<Response> {
    try {
      const coupons = await this.couponsService.findAll();
      this.logger.debug("Tìm tất cả phiếu giảm giá thành công");
      this.response.initResponse(
        true,
        "Tìm tất cả phiếu giảm giá thành công",
        coupons,
      );
      return res.status(HttpStatus.OK).json(this.response);
    } catch (error) {
      this.logger.error(
        "Xảy ra lỗi trong quá trình tìm phiếu giảm giá",
        error.stack,
      );
      if (error instanceof HttpException) {
        this.response.initResponse(false, error.message, null);
        return res.status(error.getStatus()).json(this.response);
      } else {
        this.response.initResponse(
          false,
          "Lỗi hệ thống trong quá trình tìm phiếu giảm giá",
          null,
        );
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response);
      }
    }
  }

  @Get(":id")
  @ApiOperation({
    summary: "API tìm kiếm thông tin của phiếu giảm giá qua id",
    description: "Cần truyền vào id của phiếu giảm giá dạng UUIDv4",
  })
  @ApiParam({
    name: "id",
    description: "Id của phiếu giảm giá",
  })
  @ApiResponse({
    status: 200,
    description: "Tìm kiếm phiếu giảm giá thành công",
    schema: {
      example: {
        success: true,
        message: "Tìm kiếm phiếu giảm giá thành công",
        data: {
          id: "9812466d-46c8-4f2d-bd2d-7a80816f6ecb",
          isUsed: ["4f9cecc2-ae14-42f0-8548-134b8f85bfbd"],
          name: "Chào mừng bạn mới",
          expirationDate: "2024-11-27T17:56:29.279Z",
          percent: 3,
          createdAt: "2024-12-02T12:15:49.744Z",
          updatedAt: "2024-12-02T12:15:49.744Z",
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
    description: "Lỗi hệ thống trong quá trình tìm kiếm phiếu giảm giá",
    schema: {
      example: {
        success: false,
        message: "Lỗi hệ thống trong quá trình tìm kiếm phiếu giảm giá",
        data: null,
      },
    },
  })
  async findOne(
    @Param("id", UUIDv4ValidationPipe) id: string,
    @Res() res,
  ): Promise<Response> {
    try {
      const coupon = await this.couponsService.findOne(id);
      this.logger.debug("Tìm kiếm phiếu giảm giá thành công");
      this.response.initResponse(
        true,
        "Tìm kiếm phiếu giảm giá thành công",
        coupon,
      );
      return res.status(HttpStatus.OK).json(this.response);
    } catch (error) {
      this.logger.error(
        "Lỗi trong quá trình tìm kiếm phiếu giảm giá",
        error.stack,
      );
      if (error instanceof HttpException) {
        this.response.initResponse(false, error.message, null);
        return res.status(error.getStatus()).json(this.response);
      } else {
        this.response.initResponse(
          false,
          "Lỗi hệ thống trong quá trình tìm kiếm phiếu giảm giá",
          null,
        );
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response);
      }
    }
  }

  @Put(":id")
  @ApiOperation({
    summary: "API cập nhật thông tin phiếu giảm giá",
    description: "Cần truyền vào ID dạng UUIDv4 và updateCouponDto",
  })
  @ApiParam({
    name: "id",
    description: "Id của phiếu giảm giá",
  })
  @ApiResponse({
    status: 200,
    description: "Cập nhật thông tin phiếu giảm giá thành công",
    schema: {
      example: {
        success: true,
        message: "Cập nhật thông tin phiếu giảm giá thành công",
        data: {
          id: "9812466d-46c8-4f2d-bd2d-7a80816f6ecb",
          isUsed: ["4f9cecc2-ae14-42f0-8548-134b8f85bfbd"],
          name: "huhuhu",
          expirationDate: "2024-11-27T17:56:29.279Z",
          percent: 3,
          createdAt: "2024-12-02T12:15:49.744Z",
          updatedAt: "2024-12-02T12:24:03.167Z",
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
      "Lỗi hệ thống trong quá trình cập nhật thông tin phiếu giảm giá",
    schema: {
      example: {
        success: false,
        message:
          "Lỗi hệ thống trong quá trình cập nhật thông tin phiếu giảm giá",
        data: null,
      },
    },
  })
  async update(
    @Param("id", UUIDv4ValidationPipe) id: string,
    @Body() updateCouponDto: UpdateCouponDto,
    @Res() res,
  ) {
    try {
      const updatedCoupon = await this.couponsService.update(
        id,
        updateCouponDto,
      );
      this.logger.debug("Cập nhật thông tin phiếu giảm giá thành công");
      this.response.initResponse(
        true,
        "Cập nhật thông tin phiếu giảm giá thành công",
        updatedCoupon,
      );
      return res.status(HttpStatus.OK).json(this.response);
    } catch (error) {
      this.logger.error(
        "Xảy ra lỗi trong quá trình cập nhật thông tin phiếu giảm giá",
        error.stack,
      );
      if (error instanceof HttpException) {
        this.response.initResponse(false, error.message, null);
        return res.status(error.getStatus()).json(this.response);
      } else {
        this.response.initResponse(
          false,
          "Lỗi hệ thống trong quá trình cập nhật thông tin phiếu giảm giá",
          null,
        );
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response);
      }
    }
  }

  @Delete(":id")
  @ApiOperation({
    summary: "API xóa phiếu giảm giá",
    description: "Cần truyền vào ID dạng UUIDv4",
  })
  @ApiParam({
    name: "id",
    description: "Id của phiếu giảm giá",
  })
  @ApiResponse({
    status: 200,
    description: "Xóa phiếu giảm giá thành công",
    schema: {
      example: {
        success: true,
        message: "Xóa phiếu giảm giá thành công",
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
    description: "Lỗi hệ thống trong quá trình xóa phiếu giảm giá",
    schema: {
      example: {
        success: false,
        message: "Lỗi hệ thống trong quá trình xóa phiếu giảm giá",
        data: null,
      },
    },
  })
  async remove(@Param("id", UUIDv4ValidationPipe) id: string, @Res() res) {
    try {
      await this.couponsService.remove(id);
      this.logger.debug("Xóa phiếu giảm giá thành công");
      this.response.initResponse(true, "Xóa phiếu giảm giá thành công", null);
      return res.status(HttpStatus.OK).json(this.response);
    } catch (error) {
      this.logger.error("Lỗi trong quá trình xóa phiếu giảm giá", error.stack);
      if (error instanceof HttpException) {
        this.response.initResponse(false, error.message, null);
        return res.status(error.getStatus()).json(this.response);
      } else {
        this.response.initResponse(
          false,
          "Lỗi hệ thống trong quá trình xóa phiếu giảm giá",
          null,
        );
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response);
      }
    }
  }
}
