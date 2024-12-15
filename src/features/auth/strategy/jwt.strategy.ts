import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Request } from "express";
import { TokenPayload } from "../token.payload";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request.cookies?.sid;
        },
      ]),
      secretOrKey: process.env.JWT_ACCESS_TOKEN_SECRET,
    });
  }

  async validate(payload: TokenPayload) {
    console.log("payload", {
      userId: payload.userId,
      userType: payload.userType,
    });
    return {
      userId: payload.userId,
      userType: payload.userType,
    };
  }
}
