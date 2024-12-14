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
import { ActorsService } from "./actors.service";
import { LoggerService } from "../logger/logger.service";
import { Response } from "../response/response.entity";
import { createActors } from "./dtos/create.dto";
import { updateActors } from "./dtos/update.dto";
import { ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import RoleGuard from "../auth/guards/role.guard";
import { UserType } from "src/common/constants";
import { JwtAuthGuard } from "../auth/guards/jwt_auth.guard";

@ApiTags("Actors")
@Controller("actors")
export class ActorsController {
  constructor(
    private readonly actorService: ActorsService,
    private readonly logger: LoggerService,
    private readonly response: Response,
  ) {}

  @UseGuards(RoleGuard(UserType.STAFF))
  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiResponse({
    status: 200,
    description: "Tạo diễn viên thành công.",
    schema: {
      example: {
        success: true,
        message: "Tạo diễn viên thành công",
        data: {
          id: "actorId123",
          movieId: "movieId456",
          age: 30,
          firstName: "John",
          lastName: "Doe",
          updatedAt: "2024-11-28T14:04:31.171Z",
          createdAt: "2024-11-28T14:04:31.171Z",
        },
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: "Lỗi trong quá trình xử lý.",
    schema: {
      example: {
        success: false,
        message: "Lỗi trong quá trình..",
        data: null,
      },
    },
  })
  async create(@Res() res, @Body() createDto: createActors) {
    try {
      const temp = await this.actorService.create(createDto);
      this.logger.debug("Tạo diễn viên thành công");
      this.response.initResponse(true, "Tạo diễn viên thành công", temp);
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
  @Put()
  @ApiResponse({
    status: 200,
    description: "Cập nhật thông tin diễn viên thành công.",
    schema: {
      example: {
        success: true,
        message: "Cập nhật thông tin diễn viên thành công",
        data: {
          id: "actorId123",
          movieId: "movieId456",
          age: 30,
          firstName: "John",
          lastName: "Doe",
          updatedAt: "2024-11-28T14:04:31.171Z",
          createdAt: "2024-11-28T14:04:31.171Z",
        },
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: "Lỗi trong quá trình xử lý.",
    schema: {
      example: {
        success: false,
        message: "Lỗi trong quá trình..",
        data: null,
      },
    },
  })
  async update(@Res() res, @Body() updateDto: updateActors) {
    try {
      const temp = await this.actorService.updateActor(updateDto);
      this.logger.debug("Cập nhật thông tin diễn viên thành công");
      this.response.initResponse(
        true,
        "Cập nhật thông tin diễn viên thành công",
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

  @UseGuards(RoleGuard(UserType.STAFF))
  @UseGuards(JwtAuthGuard)
  @Delete("/:movieId/:id")
  @ApiParam({
    name: "movieId",
    description: "ID của bộ phim",
    example: "movieId456",
  })
  @ApiParam({
    name: "id",
    description: "ID của diễn viên",
    example: "actorId123",
  })
  @ApiResponse({
    status: 200,
    description: "Xóa bỏ thông tin diễn viên thành công.",
    schema: {
      example: {
        success: true,
        message: "Xóa bỏ thông tin diễn viên thành công",
        data: [],
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: "Lỗi trong quá trình xử lý.",
    schema: {
      example: {
        success: false,
        message: "Lỗi trong quá trình..",
        data: null,
      },
    },
  })
  async delete(
    @Res() res,
    @Param("id") id: string,
    @Param("movieId") movieId: string,
  ) {
    try {
      const temp = await this.actorService.removeActor(movieId, id);
      this.logger.debug("Xóa bỏ thông tin diễn viên thành công");
      this.response.initResponse(
        true,
        "Xóa bỏ thông tin diễn viên thành công",
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

  @UseGuards(RoleGuard(UserType.STAFF))
  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiResponse({
    status: 200,
    description: "Lấy toàn bộ thông tin diễn viên thành công.",
    schema: {
      example: {
        success: true,
        message: "Lấy toàn bộ thông tin diễn viên thành công",
        data: [
          {
            id: "actorId123456",
            movieId: "movieId456789",
            age: 39,
            firstName: "WALKER",
            lastName: "ALAN",
            updatedAt: "2024-11-28T14:04:31.171Z",
            createdAt: "2024-11-28T14:04:31.171Z",
          },
          {
            id: "actorId123",
            movieId: "movieId456",
            age: 30,
            firstName: "John",
            lastName: "Doe",
            updatedAt: "2024-11-28T14:04:31.171Z",
            createdAt: "2024-11-28T14:04:31.171Z",
          },
        ],
      },
    },
  })
  @ApiResponse({
    status: 204,
    description: "Không có thông tin diễn viên.",
    schema: {
      example: {
        success: true,
        message: "Không có dữ liệu",
        data: [],
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: "Lỗi trong quá trình xử lý.",
    schema: {
      example: {
        success: false,
        message: "Lỗi trong quá trình..",
        data: null,
      },
    },
  })
  async getAll(@Res() res) {
    try {
      const temp = await this.actorService.getAll();
      this.logger.debug("Lấy toàn bộ thông tin diễn viên thành công");
      this.response.initResponse(
        true,
        "Lấy toàn bộ thông tin diễn viên thành công",
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

  @UseGuards(RoleGuard(UserType.STAFF))
  @UseGuards(JwtAuthGuard)
  @Get("/:movieId/:id")
  @ApiParam({
    name: "movieId",
    description: "ID của bộ phim",
    example: "movieId456",
  })
  @ApiParam({
    name: "id",
    description: "ID của diễn viên",
    example: "actorId123",
  })
  @ApiResponse({
    status: 200,
    description: "Lấy thông tin diễn viên thành công.",
    schema: {
      example: {
        success: true,
        message: "Lấy thông tin diễn viên thành công",
        data: {
          id: "actorId123",
          movieId: "movieId456",
          age: 30,
          firstName: "John",
          lastName: "Doe",
          updatedAt: "2024-11-28T14:04:31.171Z",
          createdAt: "2024-11-28T14:04:31.171Z",
        },
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: "Lỗi trong quá trình xử lý.",
    schema: {
      example: {
        success: false,
        message: "Lỗi trong quá trình..",
        data: null,
      },
    },
  })
  async getById(
    @Res() res,
    @Param("id") id: string,
    @Param("movieId") movieId: string,
  ) {
    try {
      const temp = await this.actorService.getById(movieId, id);
      this.logger.debug("Lấy thông tin diễn viên thành công");
      this.response.initResponse(
        true,
        "Lấy thông tin diễn viên thành công",
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
