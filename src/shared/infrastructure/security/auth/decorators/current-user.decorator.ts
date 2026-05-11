import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthenticatedUser } from '../../../../domain/value-objects/authenticated-user.value-object';

export type AuthRequest = Request & {
  user: AuthenticatedUser;
};

export const CurrentUser = createParamDecorator(
  (_: unknown, context: ExecutionContext) => {
    const authRequest = context.switchToHttp().getRequest<AuthRequest>();
    return authRequest.user;
  },
);
