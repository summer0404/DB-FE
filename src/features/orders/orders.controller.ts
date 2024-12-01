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
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/createOrder.dto';
import { UpdateOrderDto } from './dto/updateOrder.dto';
import { LoggerService } from '../logger/logger.service';
import { Response } from '../response/response.entity';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { UUIDv4ValidationPipe } from 'src/common/pipes/validationUUIDv4.pipe';

@Controller('orders')
export class OrdersController {
  constructor(
    private readonly ordersService: OrdersService,
    private readonly logger: LoggerService,
    private readonly response: Response,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'API để tạo đơn hàng',
  })
  @ApiResponse({
    status: 201,
    description: 'Tạo đơn hàng thành công',
  })
  @ApiResponse({
    status: 400,
    description: 'Dữ liệu đầu vào không hợp lệ',
  })
  @ApiResponse({
    status: 500,
    description: 'Lỗi hệ thống trong quá trình tạo đơn hàng',
  })
  async create(
    @Body() createOrderDto: CreateOrderDto,
    @Res() res,
  ): Promise<Response> {
    try {
      const newOrder = await this.ordersService.create(createOrderDto);
      this.logger.debug('Tạo đơn hàng thành công');
      this.response.initResponse(true, 'Tạo đơn hàng thành công', newOrder);
      return res.status(HttpStatus.CREATED).json(this.response);
    } catch (error) {
      this.logger.error('Xảy ra lỗi trong quá trình tạo đơn hàng', error.stack);
      if (error instanceof HttpException) {
        this.response.initResponse(false, error.message, null);
        return res.status(error.getStatus()).json(this.response);
      } else {
        this.response.initResponse(
          false,
          'Lỗi hệ thống trong quá trình tạo đơn hàng',
          null,
        );
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response);
      }
    }
  }

  @Get()
  @ApiOperation({
    summary: 'API để lấy thông tin tất cả đơn hàng',
  })
  @ApiResponse({
    status: 200,
    description: 'Tìm tất cả đơn hàng thành công',
  })
  @ApiResponse({
    status: 500,
    description: 'Lỗi hệ thống trong quá trình tìm đơn hàng',
  })
  async findAll(@Res() res): Promise<Response> {
    try {
      const orders = await this.ordersService.findAll();
      this.logger.debug('Tìm tất cả đơn hàng thành công');
      this.response.initResponse(
        true,
        'Tìm tất cả đơn hàng thành công',
        orders,
      );
      return res.status(HttpStatus.OK).json(this.response);
    } catch (error) {
      this.logger.error('Xảy ra lỗi trong quá trình tìm đơn hàng', error.stack);
      if (error instanceof HttpException) {
        this.response.initResponse(false, error.message, null);
        return res.status(error.getStatus()).json(this.response);
      } else {
        this.response.initResponse(
          false,
          'Lỗi hệ thống trong quá trình tìm đơn hàng',
          null,
        );
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response);
      }
    }
  }

  @Get(':id')
  @ApiOperation({
    summary: 'API tìm kiếm thông tin của đơn hàng qua id',
    description: 'Cần truyền vào id của đơn hàng dạng UUIDv4',
  })
  @ApiParam({
    name: 'id',
    type: 'UUIDv4',
    description: 'Id của đơn hàng',
    example: 'dfde6cb0-92b6-4b5f-bfb6-b9615045d898',
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: 'Tìm kiếm đơn hàng thành công',
  })
  @ApiResponse({
    status: 400,
    description: 'ID phải có dạng UUIDv4',
  })
  @ApiResponse({
    status: 500,
    description: 'Lỗi hệ thống trong quá trình tìm kiếm đơn hàng',
  })
  async findOne(
    @Param('id', UUIDv4ValidationPipe) id: string,
    @Res() res,
  ): Promise<Response> {
    try {
      const order = await this.ordersService.findOne(id);
      this.logger.debug('Tìm kiếm đơn hàng thành công');
      this.response.initResponse(true, 'Tìm kiếm đơn hàng thành công', order);
      return res.status(HttpStatus.OK).json(this.response);
    } catch (error) {
      this.logger.error('Lỗi trong quá trình tìm kiếm đơn hàng', error.stack);
      if (error instanceof HttpException) {
        this.response.initResponse(false, error.message, null);
        return res.status(error.getStatus()).json(this.response);
      } else {
        this.response.initResponse(
          false,
          'Lỗi hệ thống trong quá trình tìm kiếm đơn hàng',
          null,
        );
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response);
      }
    }
  }

  @Put(':id')
  @ApiOperation({
    summary: 'API cập nhật thông tin đơn hàng',
    description: 'Cần truyền vào ID dạng UUIDv4 và updateCouponDto',
  })
  @ApiParam({
    name: 'id',
    type: 'UUIDv4',
    description: 'Id của đơn hàng',
    example: 'dfde6cb0-92b6-4b5f-bfb6-b9615045d898',
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: 'Cập nhật thông tin đơn hàng thành công',
  })
  @ApiResponse({
    status: 400,
    description: 'Đầu vào không hợp lệ',
  })
  @ApiResponse({
    status: 500,
    description: 'Lỗi hệ thống trong quá trình cập nhật thông tin đơn hàng',
  })
  async update(
    @Param('id', UUIDv4ValidationPipe) id: string,
    @Body() updateOrderDto: UpdateOrderDto,
    @Res() res,
  ) {
    try {
      const updatedOrder = await this.ordersService.update(id, updateOrderDto);
      this.logger.debug('Cập nhật thông tin đơn hàng thành công');
      this.response.initResponse(
        true,
        'Cập nhật thông tin đơn hàng thành công',
        updatedOrder,
      );
      return res.status(HttpStatus.OK).json(this.response);
    } catch (error) {
      this.logger.error(
        'Xảy ra lỗi trong quá trình cập nhật thông tin đơn hàng',
        error.stack,
      );
      if (error instanceof HttpException) {
        this.response.initResponse(false, error.message, null);
        return res.status(error.getStatus()).json(this.response);
      } else {
        this.response.initResponse(
          false,
          'Lỗi hệ thống trong quá trình cập nhật thông tin đơn hàng',
          null,
        );
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response);
      }
    }
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'API xóa đơn hàng',
    description: 'Cần truyền vào ID dạng UUIDv4',
  })
  @ApiParam({
    name: 'id',
    type: 'UUIDv4',
    description: 'Id của đơn hàng',
    example: 'dfde6cb0-92b6-4b5f-bfb6-b9615045d898',
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: 'Xóa đơn hàng thành công',
  })
  @ApiResponse({
    status: 400,
    description: 'Dữ liệu đầu vào không hợp lệ',
  })
  @ApiResponse({
    status: 500,
    description: 'Lỗi hệ thống trong quá trình xóa đơn hàng',
  })
  async remove(@Param('id', UUIDv4ValidationPipe) id: string, @Res() res) {
    try {
      await this.ordersService.remove(id);
      this.logger.debug('Xóa đơn hàng thành công');
      this.response.initResponse(true, 'Xóa đơn hàng thành công', null);
      return res.status(HttpStatus.OK).json(this.response);
    } catch (error) {
      this.logger.error('Lỗi trong quá trình xóa đơn hàng', error.stack);
      if (error instanceof HttpException) {
        this.response.initResponse(false, error.message, null);
        return res.status(error.getStatus()).json(this.response);
      } else {
        this.response.initResponse(
          false,
          'Lỗi hệ thống trong quá trình xóa đơn hàng',
          null,
        );
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response);
      }
    }
  }
}
