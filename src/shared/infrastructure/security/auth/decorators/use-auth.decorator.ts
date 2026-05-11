import { applyDecorators, UseGuards } from '@nestjs/common';
import { JwtAccessTokenGuard } from '../guards/jwt-access-token.guard';
import { RolesGuard } from '../guards/roles.guard';
import { UseRole } from './role.decorator';

export const UseAuth = (...roles: string[]) =>
  applyDecorators(UseGuards(JwtAccessTokenGuard, RolesGuard), UseRole(roles));
