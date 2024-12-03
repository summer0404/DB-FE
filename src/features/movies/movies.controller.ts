import {
  Body,
  Controller,
  Delete,
  forwardRef,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  Post,
  Put,
  Res,
  UploadedFiles,
  UseInterceptors,
} from "@nestjs/common";
import { MoviesService } from "./movies.service";
import { LoggerService } from "../logger/logger.service";
import { Response } from "../response/response.entity";
import { CreateMovies } from "./dtos/create.dtos";
import { UpdateMovies } from "./dtos/update.dtos";
import {
  ApiConsumes,
  ApiOperation,
  ApiParam,
  ApiResponse,
} from "@nestjs/swagger";
import { AnyFilesInterceptor } from "@nestjs/platform-express";
import { SEQUELIZE } from "src/common/constants";
import { Sequelize } from "sequelize-typescript";
import { FilesService } from "../files/files.service";
import { ActorsService } from "../actors/actors.service";
import { DirectorsService } from "../directors/directors.service";

@Controller("movies")
export class MoviesController {
  constructor(
    @Inject(forwardRef(() => FilesService))
    private readonly filesService: FilesService,
    private readonly movieService: MoviesService,
    private readonly logger: LoggerService,
    private readonly actorService: ActorsService,
    private readonly directorService: DirectorsService,
    private readonly response: Response,
    @Inject(SEQUELIZE)
    private readonly dbSource: Sequelize,
  ) {}

  @Post()
  @ApiOperation({
    summary: "API để tạo phim",
  })
  @ApiResponse({
    status: 201,
    description: "Tạo phim thành công.",
    schema: {
      example: {
        success: true,
        message: "Tạo phim thành công",
        data: {
          id: "abc123",
          name: "Tên phim mẫu",
          publishDay: "2024-11-29",
          length: 120,
          ageLimitation: 13,
          country: "Việt Nam",
          description: "Mô tả chi tiết nội dung phim.",
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
  @ApiConsumes("multipart/form-data")
  @UseInterceptors(AnyFilesInterceptor())
  async create(
    @Res() res,
    @Body() createDto: CreateMovies,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    let transaction = await this.dbSource.transaction();
    try {
      let { actors, directors, ...newMovieDto } = createDto;
      const temp = await this.movieService.createMovie(
        newMovieDto as CreateMovies,
        transaction,
      );
      await this.filesService.createFile(temp?.id, files, transaction);
      if (actors) {
        for (let i in actors) {
          actors[i].movieId = temp.id;
        }
        await this.actorService.createTransaction(actors, transaction);
      }
      if (directors) {
        for (let i in directors) {
          directors[i].movieId = temp.id;
        }
        await this.directorService.createTransaction(directors, transaction);
      }
      const newMovie = await this.movieService.getByIdTransaction(
        temp.id,
        transaction,
      );
      transaction.commit();
      this.logger.debug("Tạo phim thành công");
      this.response.initResponse(true, "Tạo phim thành công", newMovie);
      return res.status(HttpStatus.OK).json(this.response);
    } catch (error) {
      transaction.rollback();
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
  @ApiOperation({
    summary: "API để cập nhật thông tin phim",
  })
  @ApiResponse({
    status: 200,
    description: "Cập nhật thông tin bộ phim thành công.",
    schema: {
      example: {
        success: true,
        message: "Cập nhật thông tin bộ phim thành công",
        data: {
          id: "abc123",
          name: "Tên phim mới",
          publishDay: "2024-11-30",
          length: 130,
          ageLimitation: 16,
          country: "Hoa Kỳ",
          description: "Mô tả mới chi tiết nội dung phim.",
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
  async update(@Res() res, @Body() updateDto: UpdateMovies) {
    try {
      const temp = await this.movieService.updateMovie(updateDto);
      this.logger.debug("Cập nhật thông tin bộ phim thành công");
      this.response.initResponse(
        true,
        "Cập nhật thông tin bộ phim thành công",
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
  @ApiOperation({
    summary: "API để xóa phim",
  })
  @ApiParam({ name: "id", description: "ID của bộ phim cần xóa" })
  @ApiResponse({
    status: 200,
    description: "Xóa bỏ thông tin bộ phim thành công.",
    schema: {
      example: {
        success: true,
        message: "Xóa bỏ thông tin bộ phim thành công",
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
      const temp = await this.movieService.removeMovie(id);
      this.logger.debug("Xóa bỏ thông tin bộ phim thành công");
      this.response.initResponse(
        true,
        "Xóa bỏ thông tin bộ phim thành công",
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

  @ApiResponse({
    status: 200,
    description: "Lấy toàn bộ thông tin bộ phim thành công.",
    schema: {
      example: {
        success: true,
        message: "Lấy toàn bộ thông tin bộ phim thành công",
        data: [
          {
            id: "abc123",
            name: "Tên phim 1",
            publishDay: "2024-11-29",
            length: 120,
            ageLimitation: 13,
            country: "Việt Nam",
            description: "Mô tả chi tiết nội dung phim 1.",
            updatedAt: "2024-11-28T14:04:31.171Z",
            createdAt: "2024-11-28T14:04:31.171Z",
          },
          {
            id: "def456",
            name: "Tên phim 2",
            publishDay: "2024-12-01",
            length: 90,
            ageLimitation: 18,
            country: "Nhật Bản",
            description: "Mô tả chi tiết nội dung phim 2.",
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
  @ApiOperation({
    summary: "API lấy toàn bộ thông tin phim",
  })
  @Get()
  async getAll(@Res() res) {
    try {
      const temp = await this.movieService.getAll();
      this.logger.debug("Lấy toàn bộ thông tin bộ phim thành công");
      this.response.initResponse(
        true,
        "Lấy toàn bộ thông tin bộ phim thành công",
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
  @ApiOperation({
    summary: "API để lấy thông tin tất cả phim",
  })
  @ApiParam({ name: "id", description: "ID của bộ phim" })
  @ApiResponse({
    status: 200,
    description: "Lấy thông tin bộ phim thành công.",
    schema: {
      example: {
        success: true,
        message: "Lấy thông tin bộ phim thành công",
        data: {
          id: "abc123",
          name: "Tên phim mẫu",
          publishDay: "2024-11-29",
          length: 120,
          ageLimitation: 13,
          country: "Việt Nam",
          description: "Mô tả chi tiết nội dung phim.",
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
      const temp = await this.movieService.getById(id);
      this.logger.debug("Lấy thông tin bộ phim thành công");
      this.response.initResponse(
        true,
        "Lấy thông tin bộ phim thành công",
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
