import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import type { AuthCurrentUser } from '../../../common/interfaces/auth-current-user.interface';

export type AuthRequest = Request & {
  user: AuthCurrentUser;
};

export const CurrentUser = createParamDecorator(
  (_: unknown, context: ExecutionContext) => {
    const authRequest = context.switchToHttp().getRequest<AuthRequest>();
    return authRequest.user;
  },
);
