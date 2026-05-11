import { AuthGuard } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtAccessTokenGuard extends AuthGuard('jwt-access') {}
