import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';

@Injectable()
export class ValidationInputPipe extends ValidationPipe {
  constructor() {
    super({
      skipMissingProperties: false, // Thuoc tinh khong duoc phep thieu
      whitelist: true, // Xoa cac thuoc tinh khong khai bao trong DTO
      forbidNonWhitelisted: true, // Cam cac thuoc tinh khong co trong DTO
      forbidUnknownValues: true, // Cam cac gia tri khong xac dinh
      stopAtFirstError: false, // Dung lai khi gap loi dau tien
      exceptionFactory: (errors: ValidationError[]) => {
        // Kiem tra neu thuoc tinh khong duoc dinh nghia
        const formattedErrors = errors.map((error) => {
          if (error.value === undefined) {
            return {
              property: error.property,
              constraints: `Thuộc tính ${error.property} phải tồn tại.`,
            };
          } else if (error.value == '') {
            return {
              property: error.property,
              constraints: `Thuộc tính '${error.property}' không được để trống.`,
            };
          } else if (
            error.constraints &&
            error.constraints.whitelistValidation
          ) {
            return {
              property: error.property,
              constraints: `Thuộc tính '${error.property}' không được tồn tại.`,
            };
          }
          return {
            property: error.property,
            constraints: Object.values(error.constraints).join(', '),
          };
        });

        return new BadRequestException({
          message: 'Dữ liệu đầu vào không hợp lệ',
          errors: formattedErrors,
        });
      },
    });
  }

  transform(value: any, metadata: ArgumentMetadata) {
    return super.transform(value, metadata);
  }
}
