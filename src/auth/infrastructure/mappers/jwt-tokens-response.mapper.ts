import { JwtTokensDto } from '../http/dtos/response/jwt-tokens.dto';
import { JwtTokens } from '../../domain/value-objects/jwt-tokens.value-object';

export const toJwtResponse = (tokens: JwtTokens): JwtTokensDto => {
  return tokens.toPrimitives();
};
