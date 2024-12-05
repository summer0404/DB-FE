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
  Inject,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { FastfoodsService } from "./fastfoods.service";
import { CreateFastfoodDto } from "./dto/createFastfood.dto";
import { UpdateFastfoodDto } from "./dto/updateFastfood.dto";
import { LoggerService } from "../logger/logger.service";
import { Response } from "../response/response.entity";
import {
  ApiConsumes,
  ApiOperation,
  ApiParam,
  ApiResponse,
} from "@nestjs/swagger";
import { UUIDv4ValidationPipe } from "src/common/pipes/validationUUIDv4.pipe";
import { FilesService } from "../files/files.service";
import { SEQUELIZE } from "src/common/constants";
import { Sequelize } from "sequelize-typescript";
import { FileInterceptor } from "@nestjs/platform-express";

@Controller("fastfoods")
export class FastfoodsController {
  constructor(
    private readonly fastfoodsService: FastfoodsService,
    private readonly filesService: FilesService,
    private readonly logger: LoggerService,
    private readonly response: Response,
    @Inject(SEQUELIZE)
    private readonly dbSource: Sequelize,
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
          id: "15d9387e-e682-4ab7-9a46-f3e459a7ead6",
          name: "CocaCola",
          group: "Popcorn",
          price: 40,
          createdAt: "2024-12-05T12:43:27.666Z",
          updatedAt: "2024-12-05T12:43:27.666Z",
          file: {
            id: "e1359797-692a-4f25-b636-070b41d18d26",
            path: "https://firebasestorage.googleapis.com/v0/b/cnpm-e0849.appspot.com/o/1733402607679-%C3%A1%C2%BA%C2%A2nh%20ch%C3%A1%C2%BB%C2%A5p%20m%C3%83%C2%A0n%20h%C3%83%C2%ACnh%202024-12-05%20095000.png?alt=media&token=d2c746f3-2f5d-4522-a5ce-b257fd19d227",
            name: "áº¢nh chá»¥p mÃ n hÃ¬nh 2024-12-05 095000.png",
            key: "1733402607679-áº¢nh chá»¥p mÃ n hÃ¬nh 2024-12-05 095000.png",
            size: "40.08 KB",
            pages: 1,
            userId: null,
            movieId: null,
            fastfoodId: "15d9387e-e682-4ab7-9a46-f3e459a7ead6",
            createdAt: "2024-12-05T12:43:29.503Z",
            updatedAt: "2024-12-05T12:43:29.503Z",
          },
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
  @ApiConsumes("multipart/form-data")
  @UseInterceptors(FileInterceptor("file"))
  async create(
    @Body() createFastfoodDto: CreateFastfoodDto,
    @UploadedFile() file: Express.Multer.File,
    @Res() res,
  ): Promise<Response> {
    let transaction = await this.dbSource.transaction();
    try {
      const temp = await this.fastfoodsService.createTransaction(
        createFastfoodDto,
        transaction,
      );
      await this.filesService.createFileFastfood(temp?.id, file, transaction);
      const newFastfood = await this.fastfoodsService.findOneTransaction(
        temp?.id,
        transaction,
      );
      transaction.commit();
      this.logger.debug("Tạo thức ăn nhanh thành công");
      this.response.initResponse(
        true,
        "Tạo thức ăn nhanh thành công",
        newFastfood,
      );
      return res.status(HttpStatus.CREATED).json(this.response);
    } catch (error) {
      transaction.rollback();
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
            id: "15d9387e-e682-4ab7-9a46-f3e459a7ead6",
            name: "CocaCola",
            group: "Popcorn",
            price: 40,
            createdAt: "2024-12-05T12:43:27.666Z",
            updatedAt: "2024-12-05T12:43:27.666Z",
            file: {
              id: "e1359797-692a-4f25-b636-070b41d18d26",
              path: "https://firebasestorage.googleapis.com/v0/b/cnpm-e0849.appspot.com/o/1733402607679-%C3%A1%C2%BA%C2%A2nh%20ch%C3%A1%C2%BB%C2%A5p%20m%C3%83%C2%A0n%20h%C3%83%C2%ACnh%202024-12-05%20095000.png?alt=media&token=d2c746f3-2f5d-4522-a5ce-b257fd19d227",
              name: "áº¢nh chá»¥p mÃ n hÃ¬nh 2024-12-05 095000.png",
              key: "1733402607679-áº¢nh chá»¥p mÃ n hÃ¬nh 2024-12-05 095000.png",
              size: "40.08 KB",
              pages: 1,
              userId: null,
              movieId: null,
              fastfoodId: "15d9387e-e682-4ab7-9a46-f3e459a7ead6",
              createdAt: "2024-12-05T12:43:29.503Z",
              updatedAt: "2024-12-05T12:43:29.503Z",
            },
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
          id: "15d9387e-e682-4ab7-9a46-f3e459a7ead6",
          name: "CocaCola",
          group: "Popcorn",
          price: 40,
          createdAt: "2024-12-05T12:43:27.666Z",
          updatedAt: "2024-12-05T12:43:27.666Z",
          file: {
            id: "e1359797-692a-4f25-b636-070b41d18d26",
            path: "https://firebasestorage.googleapis.com/v0/b/cnpm-e0849.appspot.com/o/1733402607679-%C3%A1%C2%BA%C2%A2nh%20ch%C3%A1%C2%BB%C2%A5p%20m%C3%83%C2%A0n%20h%C3%83%C2%ACnh%202024-12-05%20095000.png?alt=media&token=d2c746f3-2f5d-4522-a5ce-b257fd19d227",
            name: "áº¢nh chá»¥p mÃ n hÃ¬nh 2024-12-05 095000.png",
            key: "1733402607679-áº¢nh chá»¥p mÃ n hÃ¬nh 2024-12-05 095000.png",
            size: "40.08 KB",
            pages: 1,
            userId: null,
            movieId: null,
            fastfoodId: "15d9387e-e682-4ab7-9a46-f3e459a7ead6",
            createdAt: "2024-12-05T12:43:29.503Z",
            updatedAt: "2024-12-05T12:43:29.503Z",
          },
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
          id: "15d9387e-e682-4ab7-9a46-f3e459a7ead6",
          name: "CocaCola",
          group: "Snack",
          price: 40,
          createdAt: "2024-12-05T12:43:27.666Z",
          updatedAt: "2024-12-05T12:45:45.565Z",
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
