import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { UUID } from "crypto";
import { Sequelize } from "sequelize-typescript";
import axios from "axios";
import { SEQUELIZE } from "src/common/constants";
import { TokenPayload } from "./token.payload";
import { GoogleUserInfo } from "./google_user_info.interface";
import { userInfoUrl } from "src/common/constants";
import { UsersService } from "../users/users.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    @Inject(SEQUELIZE) private readonly dbSource: Sequelize,
  ) {}

  async getCookiesForLogOut() {
    return [
      "sid=; HttpOnly; Path=/; Max-Age=0",
      "refresh_token=; HttpOnly; Path=/; Max-Age=0",
    ];
  }

  async getCookieWithJwtAccessToken(userId: UUID) {
    const user = await this.userService.findOne(userId);

    const payload: TokenPayload = {
      userId,
      userType: user.userType,
    };

    const token = this.jwtService.sign(payload, {
      secret: process.env.JWT_ACCESS_TOKEN_SECRET,
      expiresIn: `${process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME} days`,
    });
    const maxAgeDay = +process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME;
    return { token, maxAge: maxAgeDay * 24 * 60 * 60 * 1000 };
  }

  async getCookieWithJwtRefreshToken(userId: UUID) {
    const user = await this.userService.findOne(userId);

    const payload: TokenPayload = { userId, userType: user.userType };
    const token = this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_TOKEN_SECRET,
      expiresIn: `${process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME} days`,
    });
    const maxAgeDay = +process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME;
    return {
      token,
      maxAge: maxAgeDay * 24 * 60 * 60 * 1000,
    };
  }

  async decodeTokenPayload(token: string): Promise<any> {
    try {
      const payload = this.jwtService.verify(token, {
        secret: process.env.JWT_ACCESS_TOKEN_SECRET,
      });
      return payload;
    } catch (error) {
      throw new InternalServerErrorException(
        "Xảy ra lỗi khi giải mã token payload",
      );
    }
  }

  async verifyGoogleToken(accessToken: string) {
    try {
      // Gửi yêu cầu đến Google Userinfo endpoint để lấy thông tin người dùng
      const response = await axios.get<GoogleUserInfo>(userInfoUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const { given_name, family_name, email } = response.data;
      return { given_name, family_name, email };
    } catch (error) {
      throw new HttpException(
        "Xác nhận token thất bại",
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
