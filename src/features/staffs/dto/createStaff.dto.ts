import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateStaffDto {
  @ApiProperty({
    description: 'ID của nhân viên',
    example: 'dfde6cb0-92b6-4b5f-bfb6-b9615045d898',
  })
  @IsNotEmpty({ message: 'ID của nhân viên không được để trống' })
  @IsUUID(4, { message: 'ID phải có dạng UUIDv4' })
  id: string;

  @ApiProperty({
    description: 'Lương hàng tháng của nhân viên',
    example: '10000000',
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { message: 'Lương hàng tháng phải có dạng số' })
  salary: number;

  @ApiProperty({
    description: 'Chức vụ của nhân viên',
    example: 'dfde6cb0-92b6-4b5f-bfb6-b9615045d898',
  })
  @IsOptional()
  @IsString({ message: 'Chức vụ của nhân viên phải có dạng chuỗi' })
  position: string;
}
