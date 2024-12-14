import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
  UseGuards,
} from "@nestjs/common";
import { GenreService } from "./genre.service";
import { LoggerService } from "../logger/logger.service";
import { Response } from "../response/response.entity";
import { CreateGenreDto } from "./dtos/create.dto";
import RoleGuard from "../auth/guards/role.guard";
import { UserType } from "src/common/constants";
import { JwtAuthGuard } from "../auth/guards/jwt_auth.guard";

@Controller("genre")
export class GenreController {
  constructor(
    private readonly commentService: GenreService,
    private readonly logger: LoggerService,
    private readonly response: Response,
  ) {}

  @UseGuards(RoleGuard(UserType.STAFF))
  @UseGuards(JwtAuthGuard)
  @Post()
  async getHello(@Res() res, @Body() createDto: CreateGenreDto) {
    try {
      const temp = await this.commentService.create(createDto);
      this.logger.debug("Tạo thể loại phim thành công");
      this.response.initResponse(true, "Tạo thể loại phim thành công", temp);
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

  @UseGuards(RoleGuard(UserType.STAFF))
  @UseGuards(JwtAuthGuard)
  @Delete("/:movieId/:genre")
  async delete(
    @Res() res,
    @Param("genre") genre: string,
    @Param("movieId") movieId: string,
  ) {
    try {
      const temp = await this.commentService.removeGenre(movieId, genre);
      this.logger.debug("Xóa bỏ thông tin thể loại phim thành công");
      this.response.initResponse(
        true,
        "Xóa bỏ thông tin thể loại phim thành công",
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

  @UseGuards(RoleGuard(UserType.CUSTOMER))
  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll(@Res() res) {
    try {
      const temp = await this.commentService.getAll();
      this.logger.debug("Lấy toàn bộ thông tin thể loại phim thành công");
      this.response.initResponse(
        true,
        "Lấy toàn bộ thông tin thể loại phim thành công",
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

  // @Put(":id")
  //   @ApiOperation({
  //     summary: "API cập nhật thông tin thể loại phim",
  //     description: "Cần truyền vào ID dạng UUIDv4 và updateCouponDto",
  //   })
  //   @ApiParam({
  //     name: "id",
  //     description: "Id của thể loại phim",
  //   })
  //   @ApiResponse({
  //     status: 200,
  //     description: "Cập nhật thông tin thể loại phim thành công",
  //     schema: {
  //       example: {
  //         success: true,
  //         message: "Cập nhật thông tin thể loại phim thành công",
  //         data: {
  //           id: "15d9387e-e682-4ab7-9a46-f3e459a7ead6",
  //           name: "CocaCola",
  //           group: "Snack",
  //           price: 40,
  //           createdAt: "2024-12-05T12:43:27.666Z",
  //           updatedAt: "2024-12-05T12:45:45.565Z",
  //         },
  //       },
  //     },
  //   })
  //   @ApiResponse({
  //     status: 400,
  //     description: "Đầu vào không hợp lệ",
  //     schema: {
  //       example: {
  //         success: false,
  //         message: "Đầu vào không hợp lệ",
  //         data: null,
  //       },
  //     },
  //   })
  //   @ApiResponse({
  //     status: 500,
  //     description:
  //       "Lỗi hệ thống trong quá trình cập nhật thông tin thể loại phim",
  //     schema: {
  //       example: {
  //         success: false,
  //         message:
  //           "Lỗi hệ thống trong quá trình cập nhật thông tin thể loại phim",
  //         data: null,
  //       },
  //     },
  //   })
  //   async update(
  //     @Param("id", UUIDv4ValidationPipe) id: string,
  //     @Body() updateFastfoodDto: UpdateFastfoodDto,
  //     @Res() res,
  //   ) {
  //     try {
  //       const updatedCoupon = await this.fastfoodsService.update(
  //         id,
  //         updateFastfoodDto,
  //       );
  //       this.logger.debug("Cập nhật thông tin thể loại phim thành công");
  //       this.response.initResponse(
  //         true,
  //         "Cập nhật thông tin thể loại phim thành công",
  //         updatedCoupon,
  //       );
  //       return res.status(HttpStatus.OK).json(this.response);
  //     } catch (error) {
  //       this.logger.error(
  //         "Xảy ra lỗi trong quá trình cập nhật thông tin thể loại phim",
  //         error.stack,
  //       );
  //       if (error instanceof HttpException) {
  //         this.response.initResponse(false, error.message, null);
  //         return res.status(error.getStatus()).json(this.response);
  //       } else {
  //         this.response.initResponse(
  //           false,
  //           "Lỗi hệ thống trong quá trình cập nhật thông tin thể loại phim",
  //           null,
  //         );
  //         return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response);
  //       }
  //     }
  //   }

  @UseGuards(RoleGuard(UserType.CUSTOMER))
  @UseGuards(JwtAuthGuard)
  @Get("/:movieId/:genre")
  async getById(
    @Res() res,
    @Param("genre") genre: string,
    @Param("movieId") movieId: string,
  ) {
    try {
      const temp = await this.commentService.getByIds(movieId, genre);
      this.logger.debug("Lấy thông tin thể loại phim thành công");
      this.response.initResponse(
        true,
        "Lấy thông tin thể loại phim thành công",
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
