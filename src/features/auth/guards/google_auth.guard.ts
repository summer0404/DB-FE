/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  BadRequestException,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Sequelize } from "sequelize-typescript";
import { AuthService } from "../auth.service";
import { UserService } from "src/modules/user/user.service";
import { SEQUELIZE } from "src/common/constants";
import { CreateUserDto } from "src/modules/user/dtos/createUser.dto";

@Injectable()
export class GoogleAuthGuard extends AuthGuard("google") {
  private gid: string;
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
          "Đăng nhập bằng tài khoản google không thành công",
        )
      );
    }
    return user;
  }

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const gid = request.headers["gid"];
    if (!gid) {
      throw new UnauthorizedException(
        "Bạn chưa đăng nhập bằng google hoặc đăng nhập xảy ra lỗi",
      );
    }
    try {
      const tokenInfo = await this.authService.verifyGoogleToken(gid);
      if (!tokenInfo.email) {
        throw new BadRequestException("Token google không hợp lệ");
      }

      if (!tokenInfo.email.endsWith("@hcmut.edu.vn")) {
        throw new BadRequestException("Email phải thuộc miền @hcmut.edu.vn");
      }
      
      let user = await this.userService.findByEmail(tokenInfo.email);

      if (!user) {
        const transaction = await this.dbSource.transaction();
        try {
          const userData: CreateUserDto = {
            firstName: tokenInfo.family_name,
            lastName: tokenInfo.given_name,
            email: tokenInfo.email
          };
          user = await this.userService.create(userData, transaction);
          await transaction.commit();
        } catch (error) {
          await transaction.rollback();
          throw error;
        }
      } 
      request.user = { userId: user.id, gid: gid, roles: user.roles };
      return true;
    } catch (error) {
      throw new BadRequestException("Đăng nhập bằng google không thành công");
    }
  }
}
