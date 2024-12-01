import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsUUID,
} from 'class-validator';

export class CreateTicketDto {
  @ApiProperty({
    description: 'ID của phim',
    example: 'dfde6cb0-92b6-4b5f-bfb6-b9615045d898',
  })
  @IsNotEmpty({ message: 'ID của phim không được để trống' })
  @IsUUID(4, { message: 'ID của phim phải có dạng UUIDv4' })
  movieId: string;

  @ApiProperty({
    description: 'Thời gian chiếu',
    example: '2024-11-25 10:06:00.129+07',
  })
  @IsNotEmpty({ message: 'Thời gian chiếu không được để trống' })
  @Type(() => Date)
  @IsDate({ message: 'Thời gian chiếu phải có dạng Date' })
  startTime: Date;

  @ApiProperty({
    description: 'Giá vé',
    example: 100,
  })
  @IsNotEmpty({ message: 'Giá vé không được để trống' })
  @Type(() => Number)
  @IsNumber({}, { message: 'Giá vé phải có dạng là số' })
  price: number;

  @ApiProperty({
    description: 'ID của chỗ ngồi',
    example: 100,
  })
  @IsNotEmpty({ message: 'ID của chỗ ngồi không được để trống' })
  @IsUUID(4, { message: 'ID của chỗ ngồi phải có dạng UUIDv4' })
  seatId: string;

  @ApiProperty({
    description: 'ID của đơn hàng',
    example: 100,
  })
  @IsOptional()
  @IsUUID(4, { message: 'ID của đơn hàng phải có dạng UUIDv4' })
  orderId: string;
}
