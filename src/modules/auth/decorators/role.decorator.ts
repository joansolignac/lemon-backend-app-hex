import { SetMetadata } from '@nestjs/common';

export const ROLE_KEY = 'role';

export const UseRole = (roles: string[]) => SetMetadata(ROLE_KEY, roles);
