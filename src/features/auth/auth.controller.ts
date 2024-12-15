import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
  Req,
  Res,
  UseGuards,
} from "@nestjs/common";
import { Sequelize } from "sequelize";
import { Response } from "express";
import { AuthService } from "./auth.service";
import { UserType, SEQUELIZE } from "src/common/constants";
import { GoogleAuthGuard } from "./guards/google_auth.guard";
import RequestWithUserDto from "./request_with_user.dto";
import { JwtAuthGuard } from "./guards/jwt_auth.guard";
import JwtRefreshAuthGuard from "./guards/jwt_refresh_auth.guard";
import { GoogleTestGuard } from "./guards/google_test.guard";
import { ApiHeader, ApiOperation, ApiTags } from "@nestjs/swagger";
import RoleGuard from "./guards/role.guard";
import { LoggerService } from "../logger/logger.service";
import { UsersService } from "../users/users.service";

@Controller("auth")
@ApiTags("Auth: Các API liên quan tới xác thực")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly logger: LoggerService,
    private readonly userService: UsersService,
    @Inject(SEQUELIZE) private readonly dbSource: Sequelize,
  ) {}

  @UseGuards(GoogleAuthGuard)
  @Post("log-in")
  @ApiHeader({
    name: "gid",
    description: "Token được trả về từ google",
  })
  @ApiOperation({
    summary: "API để đăng nhập bằng google",
    description:
      "Cần đính token của google trả về vào header với key là gid trước khi gọi API",
  })
  async logInWithGoogle(
    @Req() request: RequestWithUserDto,
    @Res() response: Response,
  ) {
    try {
      const { user } = request;
      const accessTokenCookie =
        await this.authService.getCookieWithJwtAccessToken(user.userId);
      const refreshTokenCookie =
        await this.authService.getCookieWithJwtRefreshToken(user.userId);
      await this.userService.setCurrentRefreshToken(
        refreshTokenCookie.token,
        user.userId,
      );
      request.res.cookie("sid", accessTokenCookie.token, {
        maxAge: accessTokenCookie.maxAge,
        sameSite: "lax",
        secure: true,
        httpOnly: false,
        path: "/",
      });

      request.res.cookie("refresh_token", refreshTokenCookie.token, {
        maxAge: refreshTokenCookie.maxAge,
        sameSite: "lax",
        secure: true,
        httpOnly: false,
        path: "/", // Đảm bảo cookie có thể truy cập từ tất cả các path,
      });

      return response.status(HttpStatus.OK).json({
        success: true,
        message: "Đã đăng nhập thành công",
        data: {
          sid: accessTokenCookie.token,
          refresh_token: refreshTokenCookie.token,
        },
      });
    } catch (error) {
      this.logger.error(error.message, error.stack);
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: `Xảy ra lỗi khi đăng nhập bằng google`,
        data: null,
      });
    }
  }

  @UseGuards(RoleGuard(UserType.CUSTOMER))
  @UseGuards(JwtAuthGuard)
  @Get("me")
  @ApiOperation({
    summary: "API để lấy thông tin người dùng",
    description:
      "Sau khi đăng nhập, gọi API này để trả về thông tin của người dùng",
  })
  async getMe(@Req() request: RequestWithUserDto, @Res() response: Response) {
    const { user } = request;
    try {
      console.log(123);

      const userInfo = await this.userService.findOne(user.userId);
      const returningData = {
        name: userInfo.firstName + " " + userInfo.lastName,
        email: userInfo.email,
        userType: userInfo.userType,
        userId: userInfo.id,
      };
      return response.status(HttpStatus.OK).json({
        success: true,
        message: `Lấy thông tin thành công`,
        data: returningData,
      });
    } catch (error) {
      this.logger.error(`Xảy ra lỗi khi lấy thông tin`, error);
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: `Xảy ra lỗi khi lấy thông tin`,
        data: null,
      });
    }
  }

  //@UseGuards(RoleGuard(ROLE.CUSTOMER))
  @Post("log-out")
  @HttpCode(200)
  @ApiOperation({
    summary: "API để đăng xuất",
    description: "Chỉ có thể gọi sau khi đăng nhập",
  })
  async logOut(@Req() request: RequestWithUserDto, @Res() response: Response) {
    try {
      request.res.clearCookie("sid");
      request.res.clearCookie("refresh_token");

      return response.status(HttpStatus.OK).json({
        success: true,
        message: "Đăng xuất thành công",
        data: null,
      });
    } catch (error) {
      this.logger.error(
        `Xảy ra lỗi khi đăng xuất ${request.user?.userId}`,
        error,
      );
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: `Xảy ra lỗi khi đăng xuất`,
        data: null,
      });
    }
  }

  @UseGuards(RoleGuard(UserType.CUSTOMER))
  @UseGuards(JwtRefreshAuthGuard)
  @Get("refresh")
  @ApiOperation({
    summary: "API để tạo lại cookie mới sau khi cookie đăng nhập hết hạn",
    description:
      "Sau khi đăng nhập 2 giờ, gọi API này để tạo 1 token mới cho người dùng",
  })
  async refresh(@Req() request: RequestWithUserDto, @Res() response: Response) {
    const { user } = request;
    try {
      const accessTokenCookie =
        await this.authService.getCookieWithJwtAccessToken(user.userId);

      response.cookie("sid", accessTokenCookie.token, {
        maxAge: accessTokenCookie.maxAge,
        sameSite: "lax", // Hỗ trợ cross-origin
        secure: true, // Cookie chỉ được gửi qua HTTPS
      });
      return response.status(HttpStatus.OK).json({
        success: true,
        message: `Tạo lại token thành công`,
        data: null,
      });
    } catch (error) {
      this.logger.error(`Xảy ra lỗi khi tạo lại token ${user?.userId}`, error);
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: `Xảy ra lỗi khi tạo lại token`,
        data: null,
      });
    }
  }

  @UseGuards(GoogleTestGuard)
  @Get("google/redirect")
  @ApiOperation({
    summary: "API test, không cần quan tâm",
    description: "Gọi API này sẽ trả về token của google",
  })
  async googleRedirect(@Req() req: RequestWithUserDto) {
    return { msg: "google/redirect", gid: req?.user?.gid };
  }
}
