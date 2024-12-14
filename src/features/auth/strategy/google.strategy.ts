/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, Inject } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, VerifyCallback } from "passport-google-oauth20";
import { AuthService } from "../auth.service";
import { Sequelize } from "sequelize-typescript";
import { Request } from "express";
import { SEQUELIZE } from "src/common/constants";
import { UsersService } from "src/features/users/users.service";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, "google_test") {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
    @Inject(SEQUELIZE) private readonly dbSource: Sequelize,
  ) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_REDIRECT_URL,
      // clientID: "avc",
      // clientSecret: "",
      // callbackURL: "",
      scope: [
        "profile",
        "email",
        "https://www.googleapis.com/auth/gmail.addons.current.action.compose",
        "https://www.googleapis.com/auth/gmail.addons.current.message.action",
      ],
      passReqToCallback: true,
      accessType: "offline", // Thêm dòng này để yêu cầu refresh token
      prompt: "consent", // Đảm bảo người dùng luôn thấy hộp thoại yêu cầu quyền
    });
  }

  async validate(
    req: Request, // Thêm req làm tham số đầu tiên
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    console.log("Access Token:", accessToken); // Log đúng accessToken
    console.log("Refresh Token:", refreshToken); // Log
    return { gid: accessToken };
  }
}
