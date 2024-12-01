import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Res,
  HttpStatus,
  HttpException,
  Put,
  Inject,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/creatUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { Response } from '../response/response.entity';
import { LoggerService } from '../logger/logger.service';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { UUIDv4ValidationPipe } from 'src/common/pipes/validationUUIDv4.pipe';
import { CustomersService } from '../customers/customers.service';
import { StaffsService } from '../staffs/staffs.service';
import { SEQUELIZE, UserType } from 'src/common/constants';
import { Sequelize } from 'sequelize-typescript';

@Controller('users')
export class UsersController {
  constructor(
    private readonly logger: LoggerService,
    private readonly response: Response,
    private readonly usersService: UsersService,
    private readonly customersService: CustomersService,
    private readonly staffsService: StaffsService,
    @Inject(SEQUELIZE)
    private readonly dbSource: Sequelize,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'API để tạo người dùng',
  })
  @ApiResponse({
    status: 201,
    description: 'Tạo người dùng thành công',
  })
  @ApiResponse({
    status: 400,
    description: 'Đầu vào không hợp lệ',
  })
  @ApiResponse({
    status: 500,
    description: 'Lỗi hệ thống trong quá trình tạo người dùng',
  })
  async create(
    @Body() createUserDto: CreateUserDto,
    @Res() res,
  ): Promise<Response> {
    const transaction = await this.dbSource.transaction();
    try {
      const newUser = await this.usersService.create(
        createUserDto,
        transaction,
      );
      await this.customersService.create(newUser.id, transaction);
      transaction.commit();
      this.logger.debug('Tạo người dùng thành công');
      this.response.initResponse(true, 'Tạo người dùng thành công', newUser);
      return res.status(HttpStatus.CREATED).json(this.response);
    } catch (error) {
      transaction.rollback();
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
          'Lỗi hệ thống trong quá trình tạo người dùng',
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
    description: 'Lỗi hệ thống trong quá trình tìm người dùng',
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
          'Lỗi hệ thống trong quá trình tìm người dùng',
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
    description: 'Lỗi hệ thống trong quá trình tìm kiếm người dùng',
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
          'Lỗi hệ thống trong quá trình tìm kiếm người dùng',
          null,
        );
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response);
      }
    }
  }

  @Put(':id')
  @ApiOperation({
    summary: 'API cập nhật thông tin người dùng',
    description: 'Cần truyền vào ID dạng UUIDv4 và updateUserDto',
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
    description: 'Cập nhật thông tin người dùng thành công',
  })
  @ApiResponse({
    status: 400,
    description: 'Đầu vào không hợp lệ',
  })
  @ApiResponse({
    status: 500,
    description: 'Lỗi hệ thống trong quá trình cập nhật thông tin người dùng',
  })
  async update(
    @Param('id', UUIDv4ValidationPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Res() res,
  ) {
    const transaction = await this.dbSource.transaction();
    try {
      const userType = updateUserDto?.userType;
      const existingUser = await this.usersService.findOne(id);

      if (
        userType &&
        typeof userType != undefined &&
        userType != undefined &&
        userType != null &&
        userType != existingUser.userType
      ) {
        if (userType == UserType.CUSTOMER) {
          await this.staffsService.removeTransaction(
            existingUser.id,
            transaction,
          );
          await this.customersService.create(existingUser.id, transaction);
        } else {
          await this.customersService.removeTransaction(
            existingUser.id,
            transaction,
          );
          await this.staffsService.create(existingUser.id, transaction);
        }
      }

      const updatedUser = await this.usersService.update(
        id,
        updateUserDto,
        transaction,
      );
      transaction.commit();
      this.logger.debug('Cập nhật thông tin người dùng thành công');
      this.response.initResponse(
        true,
        'Cập nhật thông tin người dùng thành công',
        updatedUser,
      );
      return res.status(HttpStatus.OK).json(this.response);
    } catch (error) {
      transaction.rollback();
      this.logger.error(
        'Xảy ra lỗi trong quá trình cập nhật thông tin người dùng',
        error.stack,
      );
      if (error instanceof HttpException) {
        this.response.initResponse(false, error.message, null);
        return res.status(error.getStatus()).json(this.response);
      } else {
        this.response.initResponse(
          false,
          'Lỗi hệ thống trong quá trình cập nhật thông tin người dùng',
          null,
        );
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response);
      }
    }
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'API xóa người dùng',
    description: 'Cần truyền vào ID dạng UUIDv4',
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
    description: 'Xóa người dùng thành công',
  })
  @ApiResponse({
    status: 400,
    description: 'Dữ liệu đầu vào không hợp lệ',
  })
  @ApiResponse({
    status: 500,
    description: 'Lỗi hệ thống trong quá trình xóa người dùng',
  })
  async remove(@Param('id', UUIDv4ValidationPipe) id: string, @Res() res) {
    try {
      await this.usersService.remove(id);
      this.logger.debug('Xóa người dùng thành công');
      this.response.initResponse(true, 'Xóa người dùng thành công', null);
      return res.status(HttpStatus.OK).json(this.response);
    } catch (error) {
      this.logger.error('Lỗi trong quá trình xóa người dùng', error.stack);
      if (error instanceof HttpException) {
        this.response.initResponse(
          false,
          'Lỗi trong quá trình xóa người dùng',
          null,
        );
        return res.status(error.getStatus()).json(this.response);
      } else {
        this.response.initResponse(
          false,
          'Lỗi hệ thống trong quá trình xóa người dùng',
          null,
        );
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response);
      }
    }
  }
}
