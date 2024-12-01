import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsNumber, IsUUID } from 'class-validator';
import { SizeFastfood } from 'src/common/constants';

export class CreateBookDto {
  @ApiProperty({
    description: 'ID của đơn hàng',
    example: 'dfde6cb0-92b6-4b5f-bfb6-b9615045d898',
  })
  @IsNotEmpty({ message: 'ID của đơn hàng không được để trống' })
  @IsUUID(4, { message: 'ID của đơn hàng phải có dạng UUIDv4' })
  orderId: string;

  @ApiProperty({
    description: 'ID của thức ăn nhanh',
    example: 'dfde6cb0-92b6-4b5f-bfb6-b9615045d898',
  })
  @IsNotEmpty({ message: 'ID của thức ăn nhanh không được để trống' })
  @IsUUID(4, { message: 'ID của thức ăn nhanh phải có dạng UUIDv4' })
  fastfoodId: string;

  @ApiProperty({
    description: 'Số lượng thức ăn nhanh',
    example: 3,
  })
  @IsNotEmpty({ message: 'Số lượng thức ăn nhanh không được để trống' })
  @Type(() => Number)
  @IsNumber({}, { message: 'Số lượng thức ăn nhanh phải có dạng số' })
  quantity: number;

  @ApiProperty({
    description: 'Kích cỡ thức ăn nhanh',
    example: SizeFastfood.BIG,
  })
  @IsNotEmpty({ message: 'Kích cỡ thức ăn nhanh không được để trống' })
  @IsEnum(SizeFastfood, {
    message: `Kích cỡ thức ăn nhanh phải là ${SizeFastfood.BIG} hoặc ${SizeFastfood.MEDIUM} hoặc ${SizeFastfood.SMALL}`,
  })
  size: SizeFastfood;
}
