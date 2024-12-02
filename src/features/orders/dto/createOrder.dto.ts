import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsUUID,
} from 'class-validator';
import { PaymentMethod, PaymentStatus } from 'src/common/constants';

export class CreateOrderDto {
  @ApiProperty({
    description: 'Tổng giá của đơn hàng',
    example: 1000000,
  })
  @IsNotEmpty({ message: 'Tổng giá của đơn hàng không được để trống' })
  @IsNumber({}, { message: 'Tổng giá của đơn hàng phải có dạng số' })
  totalPrice: number;

  @ApiProperty({
    description: 'Thời gian tạo đơn hàng',
    example: '2024-11-28 15:37:55.831+07',
  })
  @IsNotEmpty({ message: 'Thời gian tạo đơn hàng không được để trống' })
  @Type(() => Date)
  @IsDate({ message: 'Thời gian tạo đơn hàng phải có dạng Date' })
  createdTime: Date;

  @ApiProperty({
    description: 'ID của nhân viên',
    example: 'dfde6cb0-92b6-4b5f-bfb6-b9615045d898',
  })
  @IsOptional()
  @IsUUID(4, { message: 'ID của nhân viên phải có dạng UUIDv4' })
  staffId: string;

  @ApiProperty({
    description: 'ID của phiếu giảm giá',
    example: 'dfde6cb0-92b6-4b5f-bfb6-b9615045d898',
  })
  @IsOptional()
  @IsUUID(4, { message: 'ID của phiếu giảm giá phải có dạng UUIDv4' })
  couponId: string;

  @ApiProperty({
    description: 'ID của người dùng',
    example: 'dfde6cb0-92b6-4b5f-bfb6-b9615045d898',
  })
  @IsNotEmpty({ message: 'ID của người dùng không được để trống' })
  @IsUUID(4, { message: 'ID của người dùng phải có dạng UUIDv4' })
  userId: string;

  @ApiProperty({
    description: 'Loại người dùng',
    example: PaymentMethod.ONLINE,
  })
  @IsOptional()
  @IsEnum(PaymentMethod, {
    message: `Loại người dùng phải là ${PaymentMethod.ONLINE} hoặc ${PaymentMethod.OFFLINE}`,
  })
  paymentMethod: PaymentMethod;

  @ApiProperty({
    description: 'Chức vụ của nhân viên',
    example: 'dfde6cb0-92b6-4b5f-bfb6-b9615045d898',
  })
  @IsOptional()
  @Type(() => Date)
  @IsDate({ message: 'Chức vụ của nhân viên phải có dạng chuỗi' })
  timePayment: Date;

  @ApiProperty({
    description: 'Chức vụ của nhân viên',
    example: 'dfde6cb0-92b6-4b5f-bfb6-b9615045d898',
  })
  @IsNotEmpty({ message: 'Trạng thái thanh toán không được để trống' })
  @IsEnum(PaymentStatus, {
    message: `Loại người dùng phải là ${PaymentStatus.CANCELLED} hoặc ${PaymentStatus.IN_PROGRESS} hoặc ${PaymentStatus.OK}`,
  })
  paymentStatus: PaymentStatus;
}
