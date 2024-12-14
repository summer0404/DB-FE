/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { Sequelize } from 'sequelize-typescript';
import { AuthService } from '../auth.service';
import { UserService } from 'src/modules/user/user.service';
import { SEQUELIZE } from 'src/common/constants';

@Injectable()
export class GoogleTestGuard extends AuthGuard('google_test') {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    @Inject(SEQUELIZE) private readonly dbSource: Sequelize,
  ) {
    super();
  }

  handleRequest(err, user, info, context: ExecutionContext) {
    if (err || !user) {
      throw (
        err ||
        new UnauthorizedException(
          'Đăng nhập bằng tài khoản google không thành công',
        )
      );
    }
    return user;
  }
}
