import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsUUID } from 'class-validator';

export class UpdateCustomerDto {
  @ApiProperty({
    description: 'ID của khách hàng',
    example: 'dfde6cb0-92b6-4b5f-bfb6-b9615045d898',
  })
  @IsOptional()
  @IsUUID(4, { message: 'ID phải có dạng UUIDv4' })
  id: string;

  @ApiProperty({
    description: 'Điểm giảm giá của khách hàng',
    example: '40',
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { message: 'Điểm giảm giá phải có dạng số' })
  discountPoints: number;

  @ApiProperty({
    description: 'ID của người giới thiệu',
    example: 'dfde6cb0-92b6-4b5f-bfb6-b9615045d898',
  })
  @IsOptional()
  @IsUUID(4, { message: 'ID người giới thiệu phải có dạng UUIDv4' })
  referrerId: string;
}
