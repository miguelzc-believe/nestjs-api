import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayload } from '../dto/jwt-payload.dto';

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): JwtPayload => {
    const request : JwtPayload = ctx.switchToHttp().getRequest().user;
    return request;
  },
);