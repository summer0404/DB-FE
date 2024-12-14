import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { Request } from "express";
import { TokenPayload } from "../token.payload";
import { UsersService } from "src/features/users/users.service";

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(
  Strategy,
  "jwt-refresh-token",
) {
  constructor(private readonly userService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          // Lấy refresh_token từ cookies
          const refreshToken = request?.cookies?.refresh_token;
          return refreshToken;
        },
      ]),
      secretOrKey: process.env.JWT_REFRESH_TOKEN_SECRET,
      passReqToCallback: true,
    });
  }

  async validate(request: Request, payload: TokenPayload) {
    const refreshToken = request.cookies?.refresh_token;

    try {
      const user = await this.userService.getUserIfRefreshTokenMatches(
        refreshToken,
        payload.userId,
      );
      if (!user) {
        return null;
      }
      return { userId: user.id, userType: user.userType };
    } catch (error) {
      console.error("Xảy ra lỗi xác nhận token khi refresh_token:", error);
      throw new UnauthorizedException("Token không hợp lệ hoặc đã hết hạn");
    }
  }
}
