import { AuthenticatedSession } from '../../domain/value-objects/authenticated-session.value-object';
import { AuthenticatedSessionDto } from '../http/dtos/response/authenticated-session.dto';

export const toAuthenticatedSessionResponse = (
  session: AuthenticatedSession,
): AuthenticatedSessionDto => {
  return session.toPrimitives() as AuthenticatedSessionDto;
};
