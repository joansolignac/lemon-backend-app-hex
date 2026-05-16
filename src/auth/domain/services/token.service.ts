import { UserPayload } from '../value-objects/user-payload.value-object';

export abstract class TokenService {
  abstract generateTokens(payload: UserPayload): Promise<{ accessToken: string; refreshToken: string }>;
}
