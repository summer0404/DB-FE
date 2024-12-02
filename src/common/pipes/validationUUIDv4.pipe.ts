import {
  ArgumentMetadata,
  BadRequestException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { isUUID } from 'class-validator';

@Injectable()
export class UUIDv4ValidationPipe implements PipeTransform {
  transform(value: any) {
    if (!isUUID(value, '4')) {
      throw new BadRequestException({
        success: false,
        message: 'ID phải có dạng UUIDv4',
        data: null,
      });
    }
    return value;
  }
}
