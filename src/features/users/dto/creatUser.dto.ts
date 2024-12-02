import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { UserType } from 'src/common/constants';

export class CreateUserDto {
  @ApiProperty({
    description: 'Tên của người dùng',
    example: 'Linh',
  })
  @IsNotEmpty({ message: 'Tên của người dùng không được để trống' })
  @IsString({
    message: 'Tên của người dùng phải là chuỗi',
  })
  firstName: string;

  @ApiProperty({
    description: 'Họ và tên lót của người dùng',
    example: 'Đỗ Hoàng',
  })
  @IsNotEmpty({ message: 'Họ và tên lót của người dùng không được để trống' })
  @IsString({ message: 'Họ và tên lót của người dùng phải có dạng là chuỗi' })
  lastName: string;

  @ApiProperty({
    description: 'Ngày sinh của người dùng',
    example: new Date(),
  })
  @IsNotEmpty({ message: 'Ngày sinh không được để trống' })
  @Type(() => Date)
  @IsDate({ message: 'Ngày sinh phải có định dạng là Date' })
  dateOfBirth: Date;

  @ApiProperty({
    description: 'Email của người dùng',
    example: 'linh@gmail.com',
  })
  @IsNotEmpty({ message: 'Email không được để trống' })
  @IsEmail({}, { message: 'Email không hợp lệ' })
  email: string;

  @ApiProperty({
    description: 'Số điện thoại của người dùng',
    example: '0987654321',
  })
  @IsOptional()
  @IsString({ message: 'Số điện thoại phải có dạng chuỗi' })
  phoneNumber: string;

  @ApiProperty({
    description: 'Loại người dùng',
    example: UserType.CUSTOMER,
  })
  @IsOptional()
  @IsEnum(UserType, {
    message: `Loại người dùng phải là ${UserType.CUSTOMER} hoặc ${UserType.STAFF}`,
  })
  userType: UserType;
}
