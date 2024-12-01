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
import { CouponsService } from './coupons.service';
import { CreateCouponDto } from './dto/createCoupon.dto';
import { UpdateCouponDto } from './dto/updateCoupon.dto';
import { LoggerService } from '../logger/logger.service';
import { Response } from '../response/response.entity';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { UUIDv4ValidationPipe } from 'src/common/pipes/validationUUIDv4.pipe';

@Controller('coupons')
export class CouponsController {
  constructor(
    private readonly couponsService: CouponsService,
    private readonly logger: LoggerService,
    private readonly response: Response,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'API để tạo phiếu giảm giá',
  })
  @ApiResponse({
    status: 201,
    description: 'Tạo phiếu giảm giá thành công',
  })
  @ApiResponse({
    status: 400,
    description: 'Dữ liệu đầu vào không hợp lệ',
  })
  @ApiResponse({
    status: 500,
    description: 'Lỗi hệ thống trong quá trình tạo phiếu giảm giá',
  })
  async create(
    @Body() createCouponDto: CreateCouponDto,
    @Res() res,
  ): Promise<Response> {
    try {
      const newCoupon = await this.couponsService.create(createCouponDto);
      this.logger.debug('Tạo phiếu giảm giá thành công');
      this.response.initResponse(
        true,
        'Tạo phiếu giảm giá thành công',
        newCoupon,
      );
      return res.status(HttpStatus.CREATED).json(this.response);
    } catch (error) {
      this.logger.error(
        'Xảy ra lỗi trong quá trình tạo phiếu giảm giá',
        error.stack,
      );
      if (error instanceof HttpException) {
        this.response.initResponse(false, error.message, null);
        return res.status(error.getStatus()).json(this.response);
      } else {
        this.response.initResponse(
          false,
          'Lỗi hệ thống trong quá trình tạo phiếu giảm giá',
          null,
        );
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response);
      }
    }
  }

  @Get()
  @ApiOperation({
    summary: 'API để lấy thông tin tất cả phiếu giảm giá',
  })
  @ApiResponse({
    status: 200,
    description: 'Tìm tất cả phiếu giảm giá thành công',
  })
  @ApiResponse({
    status: 500,
    description: 'Lỗi hệ thống trong quá trình tìm phiếu giảm giá',
  })
  async findAll(@Res() res): Promise<Response> {
    try {
      const coupons = await this.couponsService.findAll();
      this.logger.debug('Tìm tất cả phiếu giảm giá thành công');
      this.response.initResponse(
        true,
        'Tìm tất cả phiếu giảm giá thành công',
        coupons,
      );
      return res.status(HttpStatus.OK).json(this.response);
    } catch (error) {
      this.logger.error(
        'Xảy ra lỗi trong quá trình tìm phiếu giảm giá',
        error.stack,
      );
      if (error instanceof HttpException) {
        this.response.initResponse(false, error.message, null);
        return res.status(error.getStatus()).json(this.response);
      } else {
        this.response.initResponse(
          false,
          'Lỗi hệ thống trong quá trình tìm phiếu giảm giá',
          null,
        );
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response);
      }
    }
  }

  @Get(':id')
  @ApiOperation({
    summary: 'API tìm kiếm thông tin của phiếu giảm giá qua id',
    description: 'Cần truyền vào id của phiếu giảm giá dạng UUIDv4',
  })
  @ApiParam({
    name: 'id',
    type: 'UUIDv4',
    description: 'Id của phiếu giảm giá',
    example: 'dfde6cb0-92b6-4b5f-bfb6-b9615045d898',
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: 'Tìm kiếm phiếu giảm giá thành công',
  })
  @ApiResponse({
    status: 400,
    description: 'ID phải có dạng UUIDv4',
  })
  @ApiResponse({
    status: 500,
    description: 'Lỗi hệ thống trong quá trình tìm kiếm phiếu giảm giá',
  })
  async findOne(
    @Param('id', UUIDv4ValidationPipe) id: string,
    @Res() res,
  ): Promise<Response> {
    try {
      const coupon = await this.couponsService.findOne(id);
      this.logger.debug('Tìm kiếm phiếu giảm giá thành công');
      this.response.initResponse(
        true,
        'Tìm kiếm phiếu giảm giá thành công',
        coupon,
      );
      return res.status(HttpStatus.OK).json(this.response);
    } catch (error) {
      this.logger.error(
        'Lỗi trong quá trình tìm kiếm phiếu giảm giá',
        error.stack,
      );
      if (error instanceof HttpException) {
        this.response.initResponse(false, error.message, null);
        return res.status(error.getStatus()).json(this.response);
      } else {
        this.response.initResponse(
          false,
          'Lỗi hệ thống trong quá trình tìm kiếm phiếu giảm giá',
          null,
        );
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response);
      }
    }
  }

  @Put(':id')
  @ApiOperation({
    summary: 'API cập nhật thông tin phiếu giảm giá',
    description: 'Cần truyền vào ID dạng UUIDv4 và updateCouponDto',
  })
  @ApiParam({
    name: 'id',
    type: 'UUIDv4',
    description: 'Id của phiếu giảm giá',
    example: 'dfde6cb0-92b6-4b5f-bfb6-b9615045d898',
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: 'Cập nhật thông tin phiếu giảm giá thành công',
  })
  @ApiResponse({
    status: 400,
    description: 'Đầu vào không hợp lệ',
  })
  @ApiResponse({
    status: 500,
    description:
      'Lỗi hệ thống trong quá trình cập nhật thông tin phiếu giảm giá',
  })
  async update(
    @Param('id', UUIDv4ValidationPipe) id: string,
    @Body() updateCouponDto: UpdateCouponDto,
    @Res() res,
  ) {
    try {
      const updatedCoupon = await this.couponsService.update(
        id,
        updateCouponDto,
      );
      this.logger.debug('Cập nhật thông tin phiếu giảm giá thành công');
      this.response.initResponse(
        true,
        'Cập nhật thông tin phiếu giảm giá thành công',
        updatedCoupon,
      );
      return res.status(HttpStatus.OK).json(this.response);
    } catch (error) {
      this.logger.error(
        'Xảy ra lỗi trong quá trình cập nhật thông tin phiếu giảm giá',
        error.stack,
      );
      if (error instanceof HttpException) {
        this.response.initResponse(false, error.message, null);
        return res.status(error.getStatus()).json(this.response);
      } else {
        this.response.initResponse(
          false,
          'Lỗi hệ thống trong quá trình cập nhật thông tin phiếu giảm giá',
          null,
        );
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response);
      }
    }
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'API xóa phiếu giảm giá',
    description: 'Cần truyền vào ID dạng UUIDv4',
  })
  @ApiParam({
    name: 'id',
    type: 'UUIDv4',
    description: 'Id của phiếu giảm giá',
    example: 'dfde6cb0-92b6-4b5f-bfb6-b9615045d898',
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: 'Xóa phiếu giảm giá thành công',
  })
  @ApiResponse({
    status: 400,
    description: 'Dữ liệu đầu vào không hợp lệ',
  })
  @ApiResponse({
    status: 500,
    description: 'Lỗi hệ thống trong quá trình xóa phiếu giảm giá',
  })
  async remove(@Param('id', UUIDv4ValidationPipe) id: string, @Res() res) {
    try {
      await this.couponsService.remove(id);
      this.logger.debug('Xóa phiếu giảm giá thành công');
      this.response.initResponse(true, 'Xóa phiếu giảm giá thành công', null);
      return res.status(HttpStatus.OK).json(this.response);
    } catch (error) {
      this.logger.error('Lỗi trong quá trình xóa phiếu giảm giá', error.stack);
      if (error instanceof HttpException) {
        this.response.initResponse(false, error.message, null);
        return res.status(error.getStatus()).json(this.response);
      } else {
        this.response.initResponse(
          false,
          'Lỗi hệ thống trong quá trình xóa phiếu giảm giá',
          null,
        );
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response);
      }
    }
  }
}
