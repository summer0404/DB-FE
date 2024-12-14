import {
  BadRequestException,
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
  Res,
  UploadedFiles,
  UseGuards,
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
import { SEQUELIZE, UserType } from "src/common/constants";
import { Sequelize } from "sequelize-typescript";
import { FilesService } from "../files/files.service";
import { ActorsService } from "../actors/actors.service";
import { DirectorsService } from "../directors/directors.service";
import { MovieInterceptor } from "src/common/interceptors/movie.interceptor";
import { GenreService } from "../genre/genre.service";
import { RoomsService } from "../rooms/rooms.service";
import { Showtime } from "../showtime/showtime.entity";
import { ShowtimeService } from "../showtime/showtime.service";
import { UUIDv4ValidationPipe } from "src/common/pipes/validationUUIDv4.pipe";
import { JwtAuthGuard } from "../auth/guards/jwt_auth.guard";
import RoleGuard from "../auth/guards/role.guard";

@Controller("movies")
export class MoviesController {
  constructor(
    @Inject(forwardRef(() => FilesService))
    private readonly filesService: FilesService,
    private readonly movieService: MoviesService,
    private readonly logger: LoggerService,
    private readonly actorService: ActorsService,
    private readonly directorService: DirectorsService,
    private readonly genreService: GenreService,
    private readonly roomsService: RoomsService,
    private readonly showtimeService: ShowtimeService,
    private readonly response: Response,
    @Inject(SEQUELIZE)
    private readonly dbSource: Sequelize,
  ) {}

  @UseGuards(RoleGuard(UserType.STAFF))
  @UseGuards(JwtAuthGuard)
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
  @UseInterceptors(MovieInterceptor)
  @UseInterceptors(AnyFilesInterceptor())
  async create(
    @Res() res,
    @Body() createDto: CreateMovies,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    let transaction = await this.dbSource.transaction();
    try {
      let { actors, directors, genres, ...newMovieDto } = createDto;

      if (createDto?.endTime?.length != createDto?.startTime?.length)
        throw new BadRequestException(
          "Thời gian bắt đầu và thời gian kết thúc phải là 2 mảng có cùng kích thước",
        );

      const startTimes = new Set();
      for (const startTime of createDto.startTime) {
        const formattedTime = new Date(startTime).toISOString(); // Chuẩn hóa định dạng
        if (startTimes.has(formattedTime)) {
          throw new BadRequestException(
            `Thời gian bắt đầu "${formattedTime}" bị trùng lặp`,
          );
        }
        startTimes.add(formattedTime);
      }

      const newTimes = createDto.startTime.map((start, index) => {
        const startTime = new Date(start);
        const endTime = new Date(createDto.endTime[index]);

        if (startTime >= endTime) {
          throw new BadRequestException(
            "Thời gian bắt đầu phải trước thời gian kết thúc",
          );
        }
        return { startTime, endTime };
      });

      // Lấy danh sách phòng
      const rooms = await this.roomsService.getAll();

      const validList = [];

      // Hàm kiểm tra xung đột thời gian
      const isTimeConflict = (newTime, existingTime) =>
        newTime.startTime < existingTime.endTime &&
        newTime.endTime > existingTime.startTime;

      // Kiểm tra và thêm suất chiếu mới
      for (const newTime of newTimes) {
        const validRoom = rooms.find((room) => {
          // Nếu phòng không có suất chiếu hoặc không có xung đột thời gian
          return room.showtimes.every((showtime) => {
            const existingTime = {
              startTime: new Date(showtime.startTime),
              endTime: new Date(showtime.endTime),
            };
            return !isTimeConflict(newTime, existingTime);
          });
        });

        if (!validRoom) {
          this.response.initResponse(false, "Showtime không hợp lệ", newTime);
          return res.status(HttpStatus.BAD_REQUEST).json(this.response);
        }

        // Thêm suất chiếu mới vào phòng hợp lệ
        const newShowtime = {
          movieId: "a",
          startTime: newTime.startTime,
          endTime: newTime.endTime,
          roomId: validRoom.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        validList.push(newShowtime);
        validRoom.showtimes.push(newShowtime as Showtime); // Cập nhật phòng
      }

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
      if (genres) {
        for (let i in genres) {
          genres[i].movieId = temp.id;
        }
        await this.genreService.createTransaction(genres, transaction);
      }
      for (let i in validList) {
        validList[i].movieId = temp.id;
        await this.showtimeService.createTransaction(validList[i], transaction);
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
        this.response.initResponse(false, error.message, null);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response);
      }
    }
  }

  @UseGuards(RoleGuard(UserType.STAFF))
  @UseGuards(JwtAuthGuard)
  @Post("/update/:id")
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
  @ApiConsumes("multipart/form-data")
  @UseInterceptors(MovieInterceptor)
  @UseInterceptors(AnyFilesInterceptor())
  async update(
    @Res() res,
    @Body() updateDto: UpdateMovies,
    @Body() any,
    @Param("id", UUIDv4ValidationPipe) id: string,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ): Promise<Response> {
    let transaction = await this.dbSource.transaction();
    try {
      const oldMovie = await this.movieService.getById(id);
      if (files && files.length > 0) {
        for (let i in oldMovie?.files) {
          await this.filesService.deleteFile(oldMovie.files[i].id);
        }
        await this.filesService.createFile(id, files, transaction);
      }
      if (any?.genres) {
        let newGenres = any?.genres;
        const tempGenres = oldMovie?.genres;
        for (let i in tempGenres) {
          await this.genreService.removeGenreTransaction(
            id,
            oldMovie?.genres[i].genre,
            transaction,
          );
        }
        for (let i in newGenres) {
          newGenres[i].movieId = id;
        }
        await this.genreService.createTransaction(newGenres, transaction);
      }
      if (any?.actors) {
        let newActors = any?.actors;
        const tempActors = oldMovie?.actors;
        for (let i in tempActors) {
          await this.actorService.removeActorTransaction(
            id,
            oldMovie?.actors[i].id,
            transaction,
          );
        }
        for (let i in newActors) {
          newActors[i].movieId = id;
        }
        await this.actorService.createTransaction(newActors, transaction);
      }
      if (any?.directors) {
        let newDirectors = any?.directors;
        const tempDirectors = oldMovie?.directors;
        for (let i in tempDirectors) {
          await this.directorService.removeDirectorTransaction(
            id,
            oldMovie?.directors[i].id,
            transaction,
          );
        }
        for (let i in newDirectors) {
          newDirectors[i].movieId = id;
        }
        await this.directorService.createTransaction(newDirectors, transaction);
      }
      const temp = await this.movieService.updateMovieTransaction(
        id,
        updateDto,
        transaction,
      );
      transaction.commit();
      this.logger.debug("Cập nhật thông tin bộ phim thành công");
      this.response.initResponse(
        true,
        "Cập nhật thông tin bộ phim thành công",
        temp,
      );
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

  @UseGuards(RoleGuard(UserType.STAFF))
  @UseGuards(JwtAuthGuard)
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
  @UseGuards(RoleGuard(UserType.CUSTOMER))
  @UseGuards(JwtAuthGuard)
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

  @UseGuards(RoleGuard(UserType.CUSTOMER))
  @UseGuards(JwtAuthGuard)
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
