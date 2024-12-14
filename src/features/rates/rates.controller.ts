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
import { Response } from "../response/response.entity";
import { LoggerService } from "../logger/logger.service";
import { RatesService } from "./rates.service";
import { CreateRateDto } from "./dtos/create.dto";
import { UpdateRateDto } from "./dtos/update.dto";
import { ApiOperation, ApiParam, ApiResponse } from "@nestjs/swagger";
import { UUIDv4ValidationPipe } from "src/common/pipes/validationUUIDv4.pipe";
import RoleGuard from "../auth/guards/role.guard";
import { UserType } from "src/common/constants";
import { JwtAuthGuard } from "../auth/guards/jwt_auth.guard";

@Controller("rates")
export class RatesController {
  constructor(
    private readonly rateService: RatesService,
    private readonly logger: LoggerService,
    private readonly response: Response,
  ) {}

  @UseGuards(RoleGuard(UserType.CUSTOMER))
  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiResponse({
    status: 200,
    description: "Tạo đánh giá thành công.",
    schema: {
      example: {
        success: true,
        message: "Rate created successfully",
        data: {
          movieId: "movie123",
          userId: "user456",
          stars: 5,
          rateTime: "2024-11-29T10:30:00Z",
          updatedAt: "2024-11-28T14:04:31.171Z",
          createdAt: "2024-11-28T14:04:31.171Z",
        },
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: "Lỗi trong quá trình tạo đánh giá.",
    schema: {
      example: {
        success: false,
        message: "Error during rate creation",
        data: null,
      },
    },
  })
  async createRate(@Res() res, @Body() createRateDto: CreateRateDto) {
    try {
      const rate = await this.rateService.create(createRateDto);
      this.logger.debug("Rate created successfully");
      this.response.initResponse(true, "Rate created successfully", rate);
      return res.status(HttpStatus.OK).json(this.response);
    } catch (error) {
      this.logger.error(error.message, error.stack);
      if (error instanceof HttpException) {
        this.response.initResponse(false, error.message, null);
        return res.status(error.getStatus()).json(this.response);
      } else {
        this.response.initResponse(false, "Error during rate creation", null);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response);
      }
    }
  }

  @UseGuards(RoleGuard(UserType.CUSTOMER))
  @UseGuards(JwtAuthGuard)
  @Put()
  @ApiResponse({
    status: 200,
    description: "Cập nhật đánh giá thành công.",
    schema: {
      example: {
        success: true,
        message: "Rate information updated successfully",
        data: {
          movieId: "movie123",
          userId: "user456",
          stars: 4,
          rateTime: "2024-11-30T14:00:00Z",
          updatedAt: "2024-11-28T14:04:31.171Z",
          createdAt: "2024-11-28T14:04:31.171Z",
        },
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: "Lỗi trong quá trình cập nhật đánh giá.",
    schema: {
      example: {
        success: false,
        message: "Error during rate update",
        data: null,
      },
    },
  })
  async updateRate(@Res() res, @Body() updateRateDto: UpdateRateDto) {
    try {
      const rate = await this.rateService.updateRate(updateRateDto);
      this.logger.debug("Rate information updated successfully");
      this.response.initResponse(
        true,
        "Rate information updated successfully",
        rate,
      );
      return res.status(HttpStatus.OK).json(this.response);
    } catch (error) {
      this.logger.error(error.message, error.stack);
      if (error instanceof HttpException) {
        this.response.initResponse(false, error.message, null);
        return res.status(error.getStatus()).json(this.response);
      } else {
        this.response.initResponse(false, "Error during rate update", null);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response);
      }
    }
  }

  @UseGuards(RoleGuard(UserType.CUSTOMER))
  @UseGuards(JwtAuthGuard)
  @Delete("/:userId/:movieId")
  @ApiParam({
    name: "userId",
    description: "ID của người dùng thực hiện đánh giá",
  })
  @ApiParam({ name: "movieId", description: "ID của bộ phim được đánh giá" })
  @ApiResponse({
    status: 200,
    description: "Xóa đánh giá thành công.",
    schema: {
      example: {
        success: true,
        message: "Rate deleted successfully",
        data: [],
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: "Lỗi trong quá trình xóa đánh giá.",
    schema: {
      example: {
        success: false,
        message: "Error during rate deletion",
        data: null,
      },
    },
  })
  async deleteRate(
    @Res() res,
    @Param("userId") userId: string,
    @Param("movieId") movieId: string,
  ) {
    try {
      const result = await this.rateService.removeRate(userId, movieId);
      this.logger.debug("Rate deleted successfully");
      this.response.initResponse(true, "Rate deleted successfully", result);
      return res.status(HttpStatus.OK).json(this.response);
    } catch (error) {
      this.logger.error(error.message, error.stack);
      if (error instanceof HttpException) {
        this.response.initResponse(false, error.message, null);
        return res.status(error.getStatus()).json(this.response);
      } else {
        this.response.initResponse(false, "Error during rate deletion", null);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response);
      }
    }
  }

  @UseGuards(RoleGuard(UserType.CUSTOMER))
  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiResponse({
    status: 200,
    description: "Lấy toàn bộ đánh giá thành công.",
    schema: {
      example: {
        success: true,
        message: "All rates retrieved successfully",
        data: [
          {
            movieId: "movie123",
            userId: "user456",
            stars: 5,
            rateTime: "2024-11-29T10:30:00Z",
            updatedAt: "2024-11-28T14:04:31.171Z",
            createdAt: "2024-11-28T14:04:31.171Z",
          },
          {
            movieId: "movie789",
            userId: "user123",
            stars: 4,
            rateTime: "2024-11-30T14:00:00Z",
            updatedAt: "2024-11-28T14:04:31.171Z",
            createdAt: "2024-11-28T14:04:31.171Z",
          },
        ],
      },
    },
  })
  @ApiResponse({
    status: 204,
    description: "Không có đánh giá nào.",
    schema: {
      example: {
        success: true,
        message: "No rates available",
        data: [],
      },
    },
  })
  async getAllRates(@Res() res) {
    try {
      const rates = await this.rateService.getAllRates();
      this.logger.debug("All rates retrieved successfully");
      this.response.initResponse(
        true,
        "All rates retrieved successfully",
        rates,
      );
      return res.status(HttpStatus.OK).json(this.response);
    } catch (error) {
      this.logger.error(error.message, error.stack);
      if (error instanceof HttpException) {
        this.response.initResponse(false, error.message, null);
        return res.status(error.getStatus()).json(this.response);
      } else {
        this.response.initResponse(false, "Error retrieving rates", null);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response);
      }
    }
  }

  @UseGuards(RoleGuard(UserType.CUSTOMER))
  @UseGuards(JwtAuthGuard)
  @Get("/:userId/:movieId")
  @ApiParam({
    name: "userId",
    description: "ID của người dùng thực hiện đánh giá",
  })
  @ApiParam({ name: "movieId", description: "ID của bộ phim được đánh giá" })
  @ApiResponse({
    status: 200,
    description: "Lấy thông tin đánh giá thành công.",
    schema: {
      example: {
        success: true,
        message: "Rate details retrieved successfully",
        data: {
          movieId: "movie123",
          userId: "user456",
          stars: 5,
          rateTime: "2024-11-29T10:30:00Z",
          updatedAt: "2024-11-28T14:04:31.171Z",
          createdAt: "2024-11-28T14:04:31.171Z",
        },
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: "Lỗi trong quá trình lấy thông tin đánh giá.",
    schema: {
      example: {
        success: false,
        message: "Error retrieving rate details",
        data: null,
      },
    },
  })
  async getRateByIds(
    @Res() res,
    @Param("userId") userId: string,
    @Param("movieId") movieId: string,
  ) {
    try {
      const rate = await this.rateService.getRateByIds(userId, movieId);
      this.logger.debug("Rate details retrieved successfully");
      this.response.initResponse(
        true,
        "Rate details retrieved successfully",
        rate,
      );
      return res.status(HttpStatus.OK).json(this.response);
    } catch (error) {
      this.logger.error(error.message, error.stack);
      if (error instanceof HttpException) {
        this.response.initResponse(false, error.message, null);
        return res.status(error.getStatus()).json(this.response);
      } else {
        this.response.initResponse(
          false,
          "Error retrieving rate details",
          null,
        );
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response);
      }
    }
  }

  @UseGuards(RoleGuard(UserType.CUSTOMER))
  @UseGuards(JwtAuthGuard)
  @Get("/:movieId")
  @ApiOperation({
    summary: "API để lấy các bình luận và đánh giá theo phim",
  })
  @ApiParam({
    name: "movieId",
    description: "ID của phim",
  })
  @ApiParam({ name: "movieId", description: "ID của bộ phim được đánh giá" })
  @ApiResponse({
    status: 200,
    description: "Lấy thông tin đánh giá thành công.",
    schema: {
      example: {
        success: true,
        message: "Rate details retrieved successfully",
        data: {
          movieId: "movie123",
          userId: "user456",
          stars: 5,
          rateTime: "2024-11-29T10:30:00Z",
          updatedAt: "2024-11-28T14:04:31.171Z",
          createdAt: "2024-11-28T14:04:31.171Z",
        },
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: "Lỗi trong quá trình lấy thông tin đánh giá.",
    schema: {
      example: {
        success: false,
        message: "Error retrieving rate details",
        data: null,
      },
    },
  })
  async getRatesByMovie(
    @Res() res,
    @Param("movieId", UUIDv4ValidationPipe) movieId: string,
  ) {
    try {
      const rate = await this.rateService.getByMovie(movieId);
      this.logger.debug("Rate details retrieved successfully");
      this.response.initResponse(
        true,
        "Rate details retrieved successfully",
        rate,
      );
      return res.status(HttpStatus.OK).json(this.response);
    } catch (error) {
      this.logger.error(error.message, error.stack);
      if (error instanceof HttpException) {
        this.response.initResponse(false, error.message, null);
        return res.status(error.getStatus()).json(this.response);
      } else {
        this.response.initResponse(
          false,
          "Error retrieving rate details",
          null,
        );
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response);
      }
    }
  }
}
