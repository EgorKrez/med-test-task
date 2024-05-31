import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetUserData = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => ctx.switchToHttp().getRequest().user,
);
