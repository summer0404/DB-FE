import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export default class JwtRefreshAuthGuard extends AuthGuard(
  'jwt-refresh-token',
) {
  handleRequest(err, user, info, context: ExecutionContext) {
    const response = context.switchToHttp().getResponse();
    if (err || !user) {
      response.clearCookie('sid');
      response.clearCookie('refresh_token');
      const errorMessage =
        err?.message || 'Bạn cần đăng nhập để truy cập tài nguyên này';
      throw new UnauthorizedException(errorMessage);
    }
    return user;
  }
}
