/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Request } from "express";
import { Observable } from "rxjs";
import { Sequelize } from "sequelize-typescript";
import { AuthService } from "../auth.service";
import { SEQUELIZE } from "src/common/constants";
import { UsersService } from "src/features/users/users.service";

@Injectable()
export class GoogleTestGuard extends AuthGuard("google_test") {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
    @Inject(SEQUELIZE) private readonly dbSource: Sequelize,
  ) {
    super();
  }

  handleRequest(err, user, info, context: ExecutionContext) {
    if (err || !user) {
      throw (
        err ||
        new UnauthorizedException(
          "Đăng nhập bằng tài khoản google không thành công",
        )
      );
    }
    return user;
  }
}
