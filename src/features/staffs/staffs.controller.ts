import {
  Controller,
  Get,
  Body,
  Param,
  Delete,
  Res,
  HttpStatus,
  HttpException,
  Put,
} from "@nestjs/common";
import { StaffsService } from "./staffs.service";
import { UpdateStaffDto } from "./dto/updateStaff.dto";
import { LoggerService } from "../logger/logger.service";
import { Response } from "../response/response.entity";
import {
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
} from "@nestjs/swagger";
import { UUIDv4ValidationPipe } from "src/common/pipes/validationUUIDv4.pipe";

@Controller("staffs")
export class StaffsController {
  constructor(
    private readonly staffsService: StaffsService,
    private readonly loggerService: LoggerService,
    private readonly response: Response,
  ) {}

  // @Post()
  // create(@Body() createStaffDto: CreateStaffDto) {
  //   return this.staffsService.create(createStaffDto);
  // }

  @Get()
  @ApiOperation({
    summary: "API tìm kiếm tất cả nhân viên",
  })
  @ApiResponse({
    status: 200,
    description: "Tìm kiếm tất cả nhân viên thành công",
    schema: {
      example: {
        success: true,
        message: "Tìm kiếm tất cả nhân viên thành công",
        data: [
          {
            id: "4f9cecc2-ae14-42f0-8548-134b8f85bfbd",
            salary: null,
            position: null,
            createdAt: "2024-12-02T07:59:14.006Z",
            updatedAt: "2024-12-02T07:59:14.006Z",
          },
        ],
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: "Lỗi hệ thống trong quá trình tìm tất cả nhân viên",
    schema: {
      example: {
        success: false,
        message: "Lỗi hệ thống trong quá trình tìm tất cả nhân viên",
        data: null,
      },
    },
  })
  async findAll(@Res() res): Promise<Response> {
    try {
      const staffs = await this.staffsService.findAll();
      this.loggerService.debug("Tìm kiếm tất cả nhân viên thành công");
      this.response.initResponse(
        true,
        "Tìm kiếm tất cả nhân viên thành công",
        staffs,
      );
      return res.status(HttpStatus.OK).json(this.response);
    } catch (error) {
      this.loggerService.error(
        "Lỗi trong quá trình tìm kiếm tất cả nhân viên",
        error.stack,
      );
      if (error instanceof HttpException) {
        this.response.initResponse(false, error.message, null);
        return res.status(error.getStatus()).json(this.response);
      } else {
        this.response.initResponse(
          false,
          "Lỗi hệ thống trong quá trình tìm tất cả nhân viên",
          null,
        );
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response);
      }
    }
  }

  @Get("/:id")
  @ApiOperation({
    summary: "API tìm kiếm tất cả nhân viên",
    description: "Cần truyền vào ID nhân viên dạng UUIDv4",
  })
  @ApiParam({
    name: "id",
    description: "Id của nhân viên",
  })
  @ApiResponse({
    status: 200,
    description: "Tìm kiếm tất cả nhân viên thành công",
    schema: {
      example: {
        success: true,
        message: "Tìm kiếm nhân viên thành công",
        data: {
          id: "4f9cecc2-ae14-42f0-8548-134b8f85bfbd",
          salary: null,
          position: null,
          createdAt: "2024-12-02T07:59:14.006Z",
          updatedAt: "2024-12-02T07:59:14.006Z",
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
  @ApiInternalServerErrorResponse({
    description: "Lỗi hệ thống trong quá trình tìm tất cả nhân viên",
    schema: {
      example: {
        success: false,
        message: "Lỗi hệ thống trong quá trình tìm tất cả nhân viên",
        data: null,
      },
    },
  })
  async findOne(@Param("id", UUIDv4ValidationPipe) id: string, @Res() res) {
    try {
      const staff = await this.staffsService.findOne(id);
      this.loggerService.debug("Tìm kiếm nhân viên thành công");
      this.response.initResponse(true, "Tìm kiếm nhân viên thành công", staff);
      return res.status(HttpStatus.OK).json(this.response);
    } catch (error) {
      this.loggerService.error(
        "Lỗi trong quá trình tìm kiếm nhân viên",
        error.stack,
      );
      if (error instanceof HttpException) {
        this.response.initResponse(false, error.message, null);
        return res.status(error.getStatus()).json(this.response);
      } else {
        this.response.initResponse(
          false,
          "Lỗi hệ thống trong quá trình tìm nhân viên",
          null,
        );
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response);
      }
    }
  }

  @Put(":id")
  @ApiOperation({
    summary: "API cập nhật thông tin nhân viên",
    description: "Cần truyền vào ID dạng UUIDv4 và updateStaffDto",
  })
  @ApiParam({
    name: "id",
    description: "Id của nhân viên",
  })
  @ApiResponse({
    status: 200,
    description: "Cập nhật thông tin nhân viên thành công",
    schema: {
      example: {
        success: true,
        message: "Cập nhật thông tin nhân viên thành công",
        data: {
          id: "4f9cecc2-ae14-42f0-8548-134b8f85bfbd",
          salary: 100,
          position: null,
          createdAt: "2024-12-02T07:59:14.006Z",
          updatedAt: "2024-12-02T08:15:33.796Z",
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
    description: "Lỗi hệ thống trong quá trình cập nhật thông tin nhân viên",
    schema: {
      example: {
        success: false,
        message: "Lỗi hệ thống trong quá trình cập nhật thông tin nhân viên",
        data: null,
      },
    },
  })
  async update(
    @Param("id", UUIDv4ValidationPipe) id: string,
    @Body() updateStaffDto: UpdateStaffDto,
    @Res() res,
  ) {
    try {
      const updatedCustomer = await this.staffsService.update(
        id,
        updateStaffDto,
      );
      this.loggerService.debug("Cập nhật thông tin nhân viên thành công");
      this.response.initResponse(
        true,
        "Cập nhật thông tin nhân viên thành công",
        updatedCustomer,
      );
      return res.status(HttpStatus.OK).json(this.response);
    } catch (error) {
      this.loggerService.error(
        "Lỗi trong quá trình cập nhật thông tin nhân viên",
        error.stack,
      );
      if (error instanceof HttpException) {
        this.response.initResponse(false, error.message, null);
        return res.status(error.getStatus()).json(this.response);
      } else {
        this.response.initResponse(
          false,
          "Lỗi hệ thống trong quá trình cập nhật thông tin nhân viên",
          null,
        );
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response);
      }
    }
  }

  @Delete(":id")
  @ApiOperation({
    summary: "API xóa nhân viên",
    description: "Cần truyền vào ID dạng UUIDv4",
  })
  @ApiParam({
    name: "id",
    description: "Id của nhân viên",
  })
  @ApiResponse({
    status: 200,
    description: "Xóa nhân viên thành công",
    schema: {
      example: {
        success: true,
        message: "Xóa nhân viên thành công",
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
    description: "Lỗi hệ thống trong quá trình xóa nhân viên",
    schema: {
      example: {
        success: false,
        message: "Lỗi hệ thống trong quá trình xóa nhân viên",
        data: null,
      },
    },
  })
  async remove(@Param("id", UUIDv4ValidationPipe) id: string, @Res() res) {
    try {
      await this.staffsService.remove(id);
      this.loggerService.debug("Xóa nhân viên thành công");
      this.response.initResponse(true, "Xóa nhân viên thành công", null);
      return res.status(HttpStatus.OK).json(this.response);
    } catch (error) {
      this.loggerService.error(
        "Lỗi trong quá trình xóa nhân viên",
        error.stack,
      );
      if (error instanceof HttpException) {
        this.response.initResponse(false, error.message, null);
        return res.status(error.getStatus()).json(this.response);
      } else {
        this.response.initResponse(
          false,
          "Lỗi hệ thống trong quá trình xóa nhân viên",
          null,
        );
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response);
      }
    }
  }
}
