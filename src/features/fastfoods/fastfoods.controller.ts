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
} from "@nestjs/common";
import { FastfoodsService } from "./fastfoods.service";
import { CreateFastfoodDto } from "./dto/createFastfood.dto";
import { UpdateFastfoodDto } from "./dto/updateFastfood.dto";
import { LoggerService } from "../logger/logger.service";
import { Response } from "../response/response.entity";
import { ApiOperation, ApiParam, ApiResponse } from "@nestjs/swagger";
import { UUIDv4ValidationPipe } from "src/common/pipes/validationUUIDv4.pipe";

@Controller("fastfoods")
export class FastfoodsController {
  constructor(
    private readonly fastfoodsService: FastfoodsService,
    private readonly logger: LoggerService,
    private readonly response: Response,
  ) {}

  @Post()
  @ApiOperation({
    summary: "API để tạo thức ăn nhanh",
  })
  @ApiResponse({
    status: 201,
    description: "Tạo thức ăn nhanh thành công",
    schema: {
      example: {
        success: true,
        message: "Tạo thức ăn nhanh thành công",
        data: {
          id: "31125bfe-61c0-4066-9248-d0d8e9eca888",
          name: "CocaCla",
          price: 40,
          updatedAt: "2024-12-02T12:07:59.286Z",
          createdAt: "2024-12-02T12:07:59.286Z",
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
    description: "Lỗi hệ thống trong quá trình tạo thức ăn nhanh",
    schema: {
      example: {
        success: false,
        message: "Lỗi hệ thống trong quá trình tạo thức ăn nhanh",
        data: null,
      },
    },
  })
  async create(
    @Body() createFastfoodDto: CreateFastfoodDto,
    @Res() res,
  ): Promise<Response> {
    try {
      const newFastfood = await this.fastfoodsService.create(createFastfoodDto);
      this.logger.debug("Tạo thức ăn nhanh thành công");
      this.response.initResponse(
        true,
        "Tạo thức ăn nhanh thành công",
        newFastfood,
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
          "Lỗi hệ thống trong quá trình tạo thức ăn nhanh",
          null,
        );
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response);
      }
    }
  }

  @Get()
  @ApiOperation({
    summary: "API để lấy thông tin tất cả thức ăn nhanh",
  })
  @ApiResponse({
    status: 200,
    description: "Tìm tất cả thức ăn nhanh thành công",
    schema: {
      example: {
        success: true,
        message: "Tìm tất cả thức ăn nhanh thành công",
        data: [
          {
            id: "ad40a5ac-3fa9-4f82-ada0-243d3f0d29ee",
            name: "CoCo",
            price: 20.5,
            createdAt: "2024-11-28T14:12:22.990Z",
            updatedAt: "2024-11-28T14:12:22.990Z",
          },
          {
            id: "3b00fdce-241b-456a-921e-27fb97544ec2",
            name: "CocaCola",
            price: 20.5,
            createdAt: "2024-11-28T14:12:32.732Z",
            updatedAt: "2024-11-28T14:12:32.732Z",
          },
          {
            id: "31125bfe-61c0-4066-9248-d0d8e9eca888",
            name: "CocaCla",
            price: 40,
            createdAt: "2024-12-02T12:07:59.286Z",
            updatedAt: "2024-12-02T12:07:59.286Z",
          },
        ],
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: "Lỗi hệ thống trong quá trình tìm thức ăn nhanh",
    schema: {
      example: {
        success: false,
        message: "Lỗi hệ thống trong quá trình tìm thức ăn nhanh",
        data: null,
      },
    },
  })
  async findAll(@Res() res): Promise<Response> {
    try {
      const fastfoods = await this.fastfoodsService.findAll();
      this.logger.debug("Tìm tất cả thức ăn nhanh thành công");
      this.response.initResponse(
        true,
        "Tìm tất cả thức ăn nhanh thành công",
        fastfoods,
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
          "Lỗi hệ thống trong quá trình tìm thức ăn nhanh",
          null,
        );
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response);
      }
    }
  }

  @Get(":id")
  @ApiOperation({
    summary: "API tìm kiếm thông tin của thức ăn nhanh qua id",
    description: "Cần truyền vào id của thức ăn nhanh dạng UUIDv4",
  })
  @ApiParam({
    name: "id",
    description: "Id của thức ăn nhanh",
  })
  @ApiResponse({
    status: 200,
    description: "Tìm kiếm thức ăn nhanh thành công",
    schema: {
      example: {
        success: true,
        message: "Tìm kiếm thức ăn nhanh thành công",
        data: {
          id: "ad40a5ac-3fa9-4f82-ada0-243d3f0d29ee",
          name: "CoCo",
          price: 20.5,
          createdAt: "2024-11-28T14:12:22.990Z",
          updatedAt: "2024-11-28T14:12:22.990Z",
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
    description: "Lỗi hệ thống trong quá trình tìm kiếm thức ăn nhanh",
    schema: {
      example: {
        success: false,
        message: "Lỗi hệ thống trong quá trình tìm kiếm thức ăn nhanh",
        data: null,
      },
    },
  })
  async findOne(
    @Param("id", UUIDv4ValidationPipe) id: string,
    @Res() res,
  ): Promise<Response> {
    try {
      const fastfood = await this.fastfoodsService.findOne(id);
      this.logger.debug("Tìm kiếm thức ăn nhanh thành công");
      this.response.initResponse(
        true,
        "Tìm kiếm thức ăn nhanh thành công",
        fastfood,
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
          "Lỗi hệ thống trong quá trình tìm kiếm thức ăn nhanh",
          null,
        );
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response);
      }
    }
  }

  @Put(":id")
  @ApiOperation({
    summary: "API cập nhật thông tin thức ăn nhanh",
    description: "Cần truyền vào ID dạng UUIDv4 và updateCouponDto",
  })
  @ApiParam({
    name: "id",
    description: "Id của thức ăn nhanh",
  })
  @ApiResponse({
    status: 200,
    description: "Cập nhật thông tin thức ăn nhanh thành công",
    schema: {
      example: {
        success: true,
        message: "Cập nhật thông tin thức ăn nhanh thành công",
        data: {
          id: "ad40a5ac-3fa9-4f82-ada0-243d3f0d29ee",
          name: "hoho",
          price: 20.5,
          createdAt: "2024-11-28T14:12:22.990Z",
          updatedAt: "2024-12-02T12:11:47.399Z",
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
      "Lỗi hệ thống trong quá trình cập nhật thông tin thức ăn nhanh",
    schema: {
      example: {
        success: false,
        message:
          "Lỗi hệ thống trong quá trình cập nhật thông tin thức ăn nhanh",
        data: null,
      },
    },
  })
  async update(
    @Param("id", UUIDv4ValidationPipe) id: string,
    @Body() updateFastfoodDto: UpdateFastfoodDto,
    @Res() res,
  ) {
    try {
      const updatedCoupon = await this.fastfoodsService.update(
        id,
        updateFastfoodDto,
      );
      this.logger.debug("Cập nhật thông tin thức ăn nhanh thành công");
      this.response.initResponse(
        true,
        "Cập nhật thông tin thức ăn nhanh thành công",
        updatedCoupon,
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
          "Lỗi hệ thống trong quá trình cập nhật thông tin thức ăn nhanh",
          null,
        );
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response);
      }
    }
  }

  @Delete(":id")
  @ApiOperation({
    summary: "API xóa thức ăn nhanh",
    description: "Cần truyền vào ID dạng UUIDv4",
  })
  @ApiParam({
    name: "id",
    description: "Id của thức ăn nhanh",
  })
  @ApiResponse({
    status: 200,
    description: "Xóa thức ăn nhanh thành công",
    schema: {
      example: {
        success: true,
        message: "Xóa thức ăn nhanh thành công",
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
    description: "Lỗi hệ thống trong quá trình xóa thức ăn nhanh",
    schema: {
      example: {
        success: false,
        message: "Lỗi hệ thống trong quá trình xóa thức ăn nhanh",
        data: null,
      },
    },
  })
  async remove(@Param("id", UUIDv4ValidationPipe) id: string, @Res() res) {
    try {
      await this.fastfoodsService.remove(id);
      this.logger.debug("Xóa thức ăn nhanh thành công");
      this.response.initResponse(true, "Xóa thức ăn nhanh thành công", null);
      return res.status(HttpStatus.OK).json(this.response);
    } catch (error) {
      this.logger.error("Lỗi trong quá trình xóa thức ăn nhanh", error.stack);
      if (error instanceof HttpException) {
        this.response.initResponse(false, error.message, null);
        return res.status(error.getStatus()).json(this.response);
      } else {
        this.response.initResponse(
          false,
          "Lỗi hệ thống trong quá trình xóa thức ăn nhanh",
          null,
        );
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response);
      }
    }
  }
}
