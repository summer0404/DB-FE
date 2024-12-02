import {
  Controller,
  Get,
  Body,
  Param,
  Delete,
  Put,
  Res,
  HttpStatus,
  HttpException,
  Inject,
  BadRequestException,
} from "@nestjs/common";
import { CustomersService } from "./customers.service";
import { UpdateCustomerDto } from "./dto/updateCustomer.dto";
import { UUIDv4ValidationPipe } from "src/common/pipes/validationUUIDv4.pipe";
import { LoggerService } from "../logger/logger.service";
import { Response } from "../response/response.entity";
import { ApiOperation, ApiParam, ApiResponse } from "@nestjs/swagger";
import { SEQUELIZE } from "src/common/constants";
import { Sequelize } from "sequelize-typescript";

@Controller("customers")
export class CustomersController {
  constructor(
    private readonly customersService: CustomersService,
    private readonly loggerService: LoggerService,
    private readonly response: Response,
    @Inject(SEQUELIZE)
    private readonly dbSource: Sequelize,
  ) {}

  // @Post()
  // create(@Body() createCustomerDto: CreateCustomerDto) {
  //   return this.customersService.create(createCustomerDto);
  // }

  @Get()
  @ApiOperation({
    summary: "API tìm kiếm tất cả khách hàng",
  })
  @ApiResponse({
    status: 200,
    description: "Tìm kiếm tất cả khách hàng thành công",
    schema: {
      example: {
        success: true,
        message: "Tìm kiếm tất cả khách hàng thành công",
        data: [
          {
            id: "0a895749-221e-4015-b6d5-ea66cc27ee79",
            discountPoints: 0,
            referrerId: null,
            createdAt: "2024-11-28T10:13:59.813Z",
            updatedAt: "2024-11-28T10:13:59.813Z",
          },
        ],
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: "Lỗi hệ thống trong quá trình tìm tất cả khác hàng",
    schema: {
      example: {
        success: false,
        message: "Lỗi hệ thống trong quá trình tìm tất cả khác hàng",
        data: null,
      },
    },
  })
  async findAll(@Res() res) {
    try {
      const customers = await this.customersService.findAll();
      this.loggerService.debug("Tìm kiếm tất cả khách hàng thành công");
      this.response.initResponse(
        true,
        "Tìm kiếm tất cả khách hàng thành công",
        customers,
      );
      return res.status(HttpStatus.OK).json(this.response);
    } catch (error) {
      this.loggerService.error(
        "Lỗi trong quá trình tìm kiếm tất cả khách hàng",
        error.stack,
      );
      if (error instanceof HttpException) {
        this.response.initResponse(false, error.message, null);
        return res.status(error.getStatus()).json(this.response);
      } else {
        this.response.initResponse(
          false,
          "Lỗi hệ thống trong quá trình tìm tất cả khác hàng",
          null,
        );
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response);
      }
    }
  }

  @Get(":id")
  @ApiOperation({
    summary: "API tìm kiếm tất cả khách hàng",
    description: "Cần truyền vào ID khách hàng dạng UUIDv4",
  })
  @ApiParam({
    name: "id",
    description: "Id của khách hàng",
  })
  @ApiResponse({
    status: 200,
    description: "Tìm kiếm tất cả khách hàng thành công",
    schema: {
      example: {
        success: true,
        message: "Tìm kiếm khách hàng thành công",
        data: {
          id: "0a895749-221e-4015-b6d5-ea66cc27ee79",
          discountPoints: 0,
          referrerId: null,
          createdAt: "2024-11-28T10:13:59.813Z",
          updatedAt: "2024-11-28T10:13:59.813Z",
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
    description: "Lỗi hệ thống trong quá trình tìm tất cả khác hàng",
    schema: {
      example: {
        success: false,
        message: "Lỗi hệ thống trong quá trình tìm tất cả khác hàng",
        data: null,
      },
    },
  })
  async findOne(@Param("id", UUIDv4ValidationPipe) id: string, @Res() res) {
    try {
      const customer = await this.customersService.findOne(id);
      this.loggerService.debug("Tìm kiếm khách hàng thành công");
      this.response.initResponse(
        true,
        "Tìm kiếm khách hàng thành công",
        customer,
      );
      return res.status(HttpStatus.OK).json(this.response);
    } catch (error) {
      this.loggerService.error(
        "Lỗi trong quá trình tìm kiếm khách hàng",
        error.stack,
      );
      if (error instanceof HttpException) {
        this.response.initResponse(false, error.message, null);
        return res.status(error.getStatus()).json(this.response);
      } else {
        this.response.initResponse(
          false,
          "Lỗi hệ thống trong quá trình tìm khách hàng",
          null,
        );
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response);
      }
    }
  }

  @Put(":id")
  @ApiOperation({
    summary: "API cập nhật thông tin khách hàng",
    description: "Cần truyền vào ID dạng UUIDv4 và updateCustomerDto",
  })
  @ApiParam({
    name: "id",
    description: "Id của khách hàng",
  })
  @ApiResponse({
    status: 200,
    description: "Cập nhật thông tin khách hàng thành công",
    schema: {
      example: {
        success: true,
        message: "Cập nhật thông tin khách hàng thành công",
        data: {
          id: "0a895749-221e-4015-b6d5-ea66cc27ee79",
          discountPoints: 20,
          referrerId: null,
          createdAt: "2024-11-28T10:13:59.813Z",
          updatedAt: "2024-12-02T07:54:34.153Z",
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
    description: "Lỗi hệ thống trong quá trình cập nhật thông tin khách hàng",
    schema: {
      example: {
        success: false,
        message: "Lỗi hệ thống trong quá trình cập nhật thông tin khách hàng",
        data: null,
      },
    },
  })
  async update(
    @Param("id", UUIDv4ValidationPipe) id: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
    @Res() res,
  ) {
    const transaction = await this.dbSource.transaction();
    try {
      const referrerId = updateCustomerDto?.referrerId;
      if (referrerId) {
        const existingReferer = await this.customersService.findOne(referrerId);

        if (!existingReferer)
          throw new BadRequestException(
            "Không tồn tại người giới thiệu tương ứng",
          );
        const temp = {
          discountPoints: existingReferer.discountPoints + 20,
        };
        await this.customersService.update(
          referrerId,
          temp as UpdateCustomerDto,
          transaction,
        );
      }
      const updatedCustomer = await this.customersService.update(
        id,
        updateCustomerDto,
        transaction,
      );
      transaction.commit();
      this.loggerService.debug("Cập nhật thông tin khách hàng thành công");
      this.response.initResponse(
        true,
        "Cập nhật thông tin khách hàng thành công",
        updatedCustomer,
      );
      return res.status(HttpStatus.OK).json(this.response);
    } catch (error) {
      transaction.rollback();
      this.loggerService.error(
        "Lỗi trong quá trình cập nhật thông tin khách hàng",
        error.stack,
      );
      if (error instanceof HttpException) {
        this.response.initResponse(false, error.message, null);
        return res.status(error.getStatus()).json(this.response);
      } else {
        this.response.initResponse(
          false,
          "Lỗi hệ thống trong quá trình cập nhật thông tin khách hàng",
          null,
        );
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response);
      }
    }
  }

  @Delete(":id")
  @ApiOperation({
    summary: "API xóa khách hàng",
    description: "Cần truyền vào ID dạng UUIDv4",
  })
  @ApiParam({
    name: "id",
    description: "Id của người dùng",
  })
  @ApiResponse({
    status: 200,
    description: "Xóa khách hàng thành công",
    schema: {
      example: {
        success: true,
        message: "Xóa khách hàng thành công",
        data: null,
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
    description: "Lỗi hệ thống trong quá trình xóa khách hàng",
    schema: {
      example: {
        success: false,
        message: "Lỗi hệ thống trong quá trình xóa khách hàng",
        data: null,
      },
    },
  })
  async remove(@Param("id", UUIDv4ValidationPipe) id: string, @Res() res) {
    try {
      await this.customersService.remove(id);
      this.loggerService.debug("Xóa khách hàng thành công");
      this.response.initResponse(true, "Xóa khách hàng thành công", null);
      return res.status(HttpStatus.OK).json(this.response);
    } catch (error) {
      this.loggerService.error(
        "Lỗi trong quá trình xóa khách hàng",
        error.stack,
      );
      if (error instanceof HttpException) {
        this.response.initResponse(false, error.message, null);
        return res.status(error.getStatus()).json(this.response);
      } else {
        this.response.initResponse(
          false,
          "Lỗi hệ thống trong quá trình xóa khách hàng",
          null,
        );
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response);
      }
    }
  }
}
