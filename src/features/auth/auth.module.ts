import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { DatabaseModule } from "src/config/database/database.module";
import { GoogleStrategy } from "./strategy/google.strategy";
import { JwtStrategy } from "./strategy/jwt.strategy";
import { JwtRefreshTokenStrategy } from "./strategy/jwt_refresh.strategy";
import { LoggerModule } from "../logger/logger.module";
import { UsersModule } from "../users/users.module";
import { CustomersModule } from "../customers/customers.module";
import { StaffsModule } from "../staffs/staffs.module";

@Module({
  imports: [
    UsersModule,
    PassportModule,
    DatabaseModule,
    JwtModule.register({
      secret: process.env.JWT_ACCESS_TOKEN_SECRET,
      signOptions: { expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME },
    }),
    LoggerModule,
    CustomersModule,
    StaffsModule,
  ],
  providers: [
    AuthService,
    GoogleStrategy,
    JwtStrategy,
    LoggerModule,
    JwtRefreshTokenStrategy,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
