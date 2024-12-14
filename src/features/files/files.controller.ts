import {
  Controller,
  Get,
  Param,
  Delete,
  Res,
  HttpStatus,
  HttpException,
  UseGuards,
} from "@nestjs/common";
import { FilesService } from "./files.service";
import { UpdateFileDto } from "./dto/updateFile.dto";
import { ApiOperation, ApiParam, ApiResponse } from "@nestjs/swagger";
import { LoggerService } from "../logger/logger.service";
import { Response } from "../response/response.entity";
import { UUIDv4ValidationPipe } from "src/common/pipes/validationUUIDv4.pipe";
import RoleGuard from "../auth/guards/role.guard";
import { UserType } from "src/common/constants";
import { JwtAuthGuard } from "../auth/guards/jwt_auth.guard";

@Controller("files")
export class FilesController {
  constructor(
    private readonly filesService: FilesService,
    private readonly logger: LoggerService,
    private readonly response: Response,
  ) {}

  // @Post("/user/file/:userId")
  // @ApiResponse({
  //   status: 201,
  //   description: "Upload FIle thành công",
  //   type: File,
  // })
  // @ApiResponse({
  //   status: 500,
  //   description: "Xảy ra lỗi khi upload File",
  // })
  // @ApiConsumes("multipart/form-data") // Xác định API sử dụng multipart/form-data
  // @ApiBody({
  //   schema: {
  //     type: "object",
  //     properties: {
  //       file: {
  //         type: "string",
  //         format: "binary",
  //       },
  //     },
  //   },
  // })
  // @UseInterceptors(FileInterceptor("file"))
  // async uploadFile(@UploadedFile() file: Express.Multer.File, @Req() req, @Param('userId') userId: UUID) {
  //   try {
  //     const new_file: File = await this.fileService.createFile(
  //       //req.user?.userId,
  //       userId,
  //       file
  //     );
  //     return {
  //       statusCode: HttpStatus.CREATED,
  //       message: " Upload File thành công",
  //       data: new_file,
  //     };
  //   } catch (error) {
  //     if (error instanceof BadRequestException) {
  //       throw error;
  //     }
  //     this.loggerService.error("Xảy ra lỗi khi tạo file", error);
  //     throw new InternalServerErrorException("Xảy ra lỗi khi uploadFile");
  //   }
  // }

  @UseGuards(RoleGuard(UserType.CUSTOMER))
  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({
    summary: "API để tìm thông tin các files trên hệ thống",
  })
  @ApiResponse({
    status: 200,
    description: "Tìm thông tin danh sách files thành công",
    type: File,
    schema: {
      example: {
        success: true,
        message: "Tìm kiếm các files thành công",
        data: [
          {
            id: "dcd7b802-592b-43fa-8936-c33b2245be8b",
            path: null,
            name: null,
            key: null,
            size: null,
            pages: null,
            userId: null,
            movieId: "1ad861eb-5ba0-4432-a72c-270ef964d184",
            createdAt: "2024-12-02T03:01:52.375Z",
            updatedAt: "2024-12-02T03:01:52.375Z",
          },
        ],
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: "Xảy ra lỗi khi tìm thông tin danh sách files",
    schema: {
      example: {
        success: false,
        message: "Xảy ra lỗi khi tìm thông tin danh sách files",
        data: null,
      },
    },
  })
  async getAll(@Res() res): Promise<Response> {
    try {
      const files = await this.filesService.findAll();
      this.logger.debug("Tìm thông tin danh sách files thành công");
      this.response.initResponse(
        true,
        "Tìm thông tin danh sách files thành công",
        files,
      );
      return res.status(HttpStatus.OK).json(this.response);
    } catch (error) {
      this.logger.error("Lỗi trong quá trình tìm kiếm các files", error.stack);
      if (error instanceof HttpException) {
        this.response.initResponse(
          false,
          "Lỗi trong quá trình tìm kiếm các files",
          null,
        );
        return res.status(error.getStatus()).json(this.response);
      } else {
        this.response.initResponse(
          false,
          "Lỗi hệ thống trong quá trình tìm kiếm các files",
          null,
        );
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response);
      }
    }
  }

  @UseGuards(RoleGuard(UserType.CUSTOMER))
  @UseGuards(JwtAuthGuard)
  @Get("/:id")
  @ApiOperation({
    summary: "API để tìm thông tin file theo id",
  })
  @ApiParam({
    name: "id",
    description: "id của file",
  })
  @ApiResponse({
    status: 200,
    description: "Tìm thông tin file thành công",
    type: File,
    schema: {
      example: {
        success: true,
        message: "Tìm thông tin file thành công",
        data: {
          id: "dcd7b802-592b-43fa-8936-c33b2245be8b",
          path: null,
          name: null,
          key: null,
          size: null,
          pages: null,
          userId: null,
          movieId: "1ad861eb-5ba0-4432-a72c-270ef964d184",
          createdAt: "2024-12-02T03:01:52.375Z",
          updatedAt: "2024-12-02T03:01:52.375Z",
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
    description: "Lỗi hệ thống khi tìm thông tin file",
    schema: {
      example: {
        success: false,
        message: "Lỗi hệ thống khi tìm thông tin file",
        data: null,
      },
    },
  })
  async getFileById(
    @Param("id", UUIDv4ValidationPipe) id: string,
    @Res() res,
  ): Promise<Response> {
    try {
      const file = await this.filesService.findById(id);
      this.logger.debug("Tìm thông tin file thành công");
      this.response.initResponse(true, "Tìm thông tin file thành công", file);
      return res.status(HttpStatus.OK).json(this.response);
    } catch (error) {
      this.logger.error(
        "Xảy ra lỗi trong quá trình tìm kiếm thông tin file",
        error.stack,
      );
      if (error instanceof HttpException) {
        this.response.initResponse(
          false,
          "Xảy ra lỗi trong quá trình tìm kiếm thông tin file",
          null,
        );
        return res.status(error.getStatus()).json(this.response);
      } else {
        this.response.initResponse(
          false,
          "Lỗi hệ thống khi tìm thông tin file",
          null,
        );
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response);
      }
    }
  }

  @UseGuards(RoleGuard(UserType.CUSTOMER))
  @UseGuards(JwtAuthGuard)
  @Get("/movie/:movieId")
  @ApiOperation({
    summary: "API để tìm các files của một phim dựa trên movieId",
    description: `
    + Cần truyền vào id của movie
  `,
  })
  @ApiParam({
    name: "id",
    type: "string",
    description: "ID của file (UUIDv4)",
  })
  @ApiResponse({
    status: 200,
    description: "Tìm thông tin các files thành công",
    type: File,
    schema: {
      example: {
        success: true,
        message: "Tìm kiếm các files cho phim thành công",
        data: [
          {
            id: "283ac8cb-90e3-4926-b997-db4de3c29bd7",
            path: "https://firebasestorage.googleapis.com/v0/b/cnpm-e0849.appspot.com/o/1733115429448-logobv.png?alt=media&token=b97d8854-0ccb-4e72-acd1-2505ba1fc46c",
            name: "logobv.png",
            key: "1733115429448-logobv.png",
            size: "15.69 KB",
            pages: 1,
            userId: null,
            movieId: "3c1592df-0a3d-4970-8f6d-db809284cce2",
            createdAt: "2024-12-02T04:57:10.950Z",
            updatedAt: "2024-12-02T04:57:10.950Z",
          },
        ],
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: "Xảy ra lỗi trong quá trình tìm kiếm các files",
    schema: {
      example: {
        success: false,
        message: "Xảy ra lỗi trong quá trình tìm kiếm các files",
        data: null,
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: "Lỗi khi lấy thông tin các files",
    schema: {
      example: {
        success: false,
        message: "Lỗi hệ thống trong quá trình tìm kiếm người dùng",
        data: null,
      },
    },
  })
  @ApiParam({
    name: "id",
    type: "string",
    description: "ID của file (UUIDv4)",
  })
  async getMovieFiles(
    @Param("id", UUIDv4ValidationPipe) id: string,
    @Res() res,
  ) {
    try {
      const files = await this.filesService.findForMovie(id);
      this.logger.debug("Tìm thông tin các files thành công");
      this.response.initResponse(
        true,
        "Tìm thông tin các files thành công",
        files,
      );
      return res.status(HttpStatus.OK).json(this.response);
    } catch (error) {
      this.logger.error(
        "Xảy ra lỗi trong quá trình tìm kiếm các files",
        error.stack,
      );
      if (error instanceof HttpException) {
        this.response.initResponse(
          false,
          "Xảy ra lỗi trong quá trình tìm kiếm các files",
          null,
        );
        return res.status(error.getStatus()).json(this.response);
      } else {
        this.response.initResponse(
          false,
          "Lỗi khi lấy thông tin các files",
          null,
        );
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response);
      }
    }
  }

  @UseGuards(RoleGuard(UserType.CUSTOMER))
  @UseGuards(JwtAuthGuard)
  @Get("/user/:id")
  @ApiOperation({
    summary: "API để tìm thông tin file theo người dùng",
    description: `
    + Cần truyền vào id của user
  `,
  })
  @ApiParam({
    name: "id",
    type: "string",
    description: "ID của file (UUIDv4)",
  })
  @ApiResponse({
    status: 200,
    description: "Tìm thông tin file thành công",
    type: File,
    schema: {
      example: {
        success: true,
        message: "Tìm thông tin file thành công",
        data: [
          {
            id: "283ac8cb-90e3-4926-b997-db4de3c29bd7",
            path: "https://firebasestorage.googleapis.com/v0/b/cnpm-e0849.appspot.com/o/1733115429448-logobv.png?alt=media&token=b97d8854-0ccb-4e72-acd1-2505ba1fc46c",
            name: "logobv.png",
            key: "1733115429448-logobv.png",
            size: "15.69 KB",
            pages: 1,
            userId: null,
            movieId: "3c1592df-0a3d-4970-8f6d-db809284cce2",
            createdAt: "2024-12-02T04:57:10.950Z",
            updatedAt: "2024-12-02T04:57:10.950Z",
          },
        ],
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: "Xảy ra lỗi khi lấy thông tin file",
    schema: {
      example: {
        success: false,
        message: "Xảy ra lỗi khi lấy thông tin file",
        data: null,
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: "Lỗi hệ thống khi lấy thông tin file",
    schema: {
      example: {
        success: false,
        message: "Lỗi hệ thống khi lấy thông tin file",
        data: null,
      },
    },
  })
  @ApiParam({
    name: "id",
    type: "string",
    description: "ID của file (UUIDv4)",
  })
  async getUserFile(@Param("id", UUIDv4ValidationPipe) id: string, @Res() res) {
    try {
      const file = await this.filesService.findForUser(id);
      this.logger.debug("Tìm thông tin file thành công");
      this.response.initResponse(true, "Tìm thông tin file thành công", file);
      return res.status(HttpStatus.OK).json(this.response);
    } catch (error) {
      this.logger.error("Xảy ra lỗi khi lấy thông tin file", error.stack);
      if (error instanceof HttpException) {
        this.response.initResponse(
          false,
          "Xảy ra lỗi khi lấy thông tin file",
          null,
        );
        return res.status(error.getStatus()).json(this.response);
      } else {
        this.response.initResponse(
          false,
          "Lỗi hệ thống khi lấy thông tin file",
          null,
        );
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response);
      }
    }
  }

  @UseGuards(RoleGuard(UserType.STAFF))
  @UseGuards(JwtAuthGuard)
  @Delete("/:id")
  @ApiOperation({
    summary: "API để xóa file",
    description: `
    + Cần truyền vào id của file
  `,
  })
  @ApiParam({
    name: "id",
    description: "ID của file (UUIDv4)",
  })
  @ApiResponse({
    status: 200,
    description: "Xóa file thành công",
    type: File,
    schema: {
      example: {
        success: true,
        message: "Xóa file thành công",
        data: null,
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: `Các lỗi có thể gặp phải:\n 
    + ID file phải là chuỗi UUID phiên bản 4\n 
    + File với id không tồn tại`,
    schema: {
      example: {
        success: false,
        message: "Xảy ra lỗi trong quá trình xóa file",
        data: null,
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: "Xảy ra lỗi khi xóa file",
    schema: {
      example: {
        success: false,
        message: "Lỗi hệ thống trong quá trình xóa file",
        data: null,
      },
    },
  })
  @ApiParam({
    name: "id",
    type: "string",
    description: "ID của file (UUIDv4)",
  })
  async deleteFile(@Param("id", UUIDv4ValidationPipe) id: string, @Res() res) {
    try {
      await this.filesService.deleteFile(id);
      this.logger.debug("Xóa file thành công");
      this.response.initResponse(true, "Xóa file thành công", null);
      return res.status(HttpStatus.OK).json(this.response);
    } catch (error) {
      this.logger.error("Xảy ra lỗi trong quá trình xóa file", error.stack);
      if (error instanceof HttpException) {
        this.response.initResponse(
          false,
          "Xảy ra lỗi trong quá trình xóa file",
          null,
        );
        return res.status(error.getStatus()).json(this.response);
      } else {
        this.response.initResponse(
          false,
          "Lỗi hệ thống trong quá trình xóa file",
          null,
        );
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response);
      }
    }
  }
}
