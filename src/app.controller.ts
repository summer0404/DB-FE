import {
  BadRequestException,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
  NotFoundException,
  Res,
} from '@nestjs/common';
import { AppService } from './app.service';
import { LoggerService } from './features/logger/logger.service';
import { Response } from './features/response/response.entity';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly logger: LoggerService,
    private readonly response: Response,
  ) {}

  @Get()
  getHello(@Res() res) {
    try {
      const temp = {
        id: 1,
        name: 'hihihihihihi',
      };
      this.logger.debug('Tìm kiếm người dùng thành công');
      this.response.initResponse(true, 'Find thành công', temp);
      throw new HttpException('oh sheet', HttpStatus.BAD_REQUEST);
      return res.status(HttpStatus.OK).json(this.response);
    } catch (error) {
      this.logger.error(error.message, error.stack);
      if (error instanceof HttpException) {
        this.response.initResponse(false, error.message, null);
        return res.status(error.getStatus()).json(this.response);
      } else {
        this.response.initResponse(false, 'Lỗi trong quá trình..', null);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response);
      }
    }
  }

  @Get('/a')
  getLolo(@Res() res) {
    try {
      const temp = {
        id: 1,
        name: 'hihihihihihi',
      };
      this.logger.debug('Tìm kiếm người dùng thành công');
      this.response.initResponse(true, 'Find thành công', temp);
      // throw new HttpException('oh sheet', HttpStatus.BAD_REQUEST);
      return res.status(HttpStatus.OK).json(this.response);
    } catch (error) {
      this.logger.error(error.message, error.stack);
      if (error instanceof HttpException) {
        this.response.initResponse(false, error.message, null);
        return res.status(error.getStatus()).json(this.response);
      } else {
        this.response.initResponse(false, 'Lỗi trong quá trình..', null);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response);
      }
    }
  }
}
