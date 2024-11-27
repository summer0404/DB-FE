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
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/creatUser.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Response } from '../response/response.entity';
import { LoggerService } from '../logger/logger.service';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { UUIDv4ValidationPipe } from 'src/common/pipes/validationUUIDv4.pipe';

@Controller('users')
export class UsersController {
  constructor(
    private readonly logger: LoggerService,
    private readonly response: Response,
    private readonly usersService: UsersService,
  ) {}

  @Post()
  async create(
    @Body() createUserDto: CreateUserDto,
    @Res() res,
  ): Promise<Response> {
    try {
      const newUser = await this.usersService.create(createUserDto);
      this.logger.debug('Tạo người dùng thành công');
      this.response.initResponse(true, 'Tạo người dùng thành công', newUser);
      return res.status(HttpStatus.CREATED).json(this.response);
    } catch (error) {
      this.logger.error(
        'Xảy ra lỗi trong quá trình tạo người dùng',
        error.stack,
      );
      if (error instanceof HttpException) {
        this.response.initResponse(false, error.message, null);
        return res.status(error.getStatus()).json(this.response);
      } else {
        this.response.initResponse(
          false,
          'Xảy ra lỗi trong quá trình tạo người dùng',
          null,
        );
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response);
      }
    }
  }

  @Get()
  @ApiOperation({
    summary: 'API để lấy thông tin tất cả người dùng',
  })
  @ApiResponse({
    status: 200,
    description: 'Tìm tất cả người dùng thành công',
  })
  @ApiResponse({
    status: 500,
    description: 'Xảy ra lỗi trong quá trình tìm người dùng',
  })
  async findAll(@Res() res): Promise<Response> {
    try {
      const users = await this.usersService.findAll();
      this.logger.debug('Tìm tất cả người dùng thành công');
      this.response.initResponse(
        true,
        'Tìm tất cả người dùng thành công',
        users,
      );
      return res.status(HttpStatus.OK).json(this.response);
    } catch (error) {
      this.logger.error(
        'Xảy ra lỗi trong quá trình tìm người dùng',
        error.stack,
      );
      if (error instanceof HttpException) {
        this.response.initResponse(false, error.message, null);
        return res.status(error.getStatus()).json(this.response);
      } else {
        this.response.initResponse(
          false,
          'Xảy ra lỗi trong quá trình tìm người dùng',
          null,
        );
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response);
      }
    }
  }

  @Get(':id')
  @ApiOperation({
    summary: 'API tìm kiếm thông tin của người dùng qua id',
    description: 'Cần truyền vào id của người dùng dạng UUIDv4',
  })
  @ApiParam({
    name: 'id',
    type: 'UUIDv4',
    description: 'Id của người dùng',
    example: 'dfde6cb0-92b6-4b5f-bfb6-b9615045d898',
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: 'Tìm kiếm người dùng thành công',
  })
  @ApiResponse({
    status: 400,
    description: 'ID phải có dạng UUIDv4',
  })
  @ApiResponse({
    status: 500,
    description: 'Xảy ra lỗi trong quá trình tìm kiếm người dùng',
  })
  async findOne(
    @Param('id', UUIDv4ValidationPipe) id: string,
    @Res() res,
  ): Promise<Response> {
    try {
      const user = await this.usersService.findOne(id);
      this.logger.debug('Tìm kiếm người dùng thành công');
      this.response.initResponse(true, 'Tìm kiếm người dùng thành công', user);
      return res.status(HttpStatus.OK).json(this.response);
    } catch (error) {
      this.logger.error('Lỗi trong quá trình tìm kiếm người dùng', error.stack);
      if (error instanceof HttpException) {
        this.response.initResponse(false, error.message, null);
        return res.status(error.getStatus()).json(this.response);
      } else {
        this.response.initResponse(
          false,
          'Xảy ra lỗi trong quá trình tìm kiếm người dùng',
          null,
        );
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response);
      }
    }
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
