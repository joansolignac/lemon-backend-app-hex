import { UserPayload } from '../value-objects/user-payload.value-object';
import { JwtTokens } from '../value-objects/jwt-tokens.value-object';

export abstract class TokenService {
  abstract generateTokens(payload: UserPayload): Promise<JwtTokens>;
}
