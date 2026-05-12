import { DomainErrorCode } from './error-code.enum';

export abstract class DomainException extends Error {
  protected constructor(
    message: string,
    public readonly code: DomainErrorCode,
  ) {
    super(message);
    this.name = this.constructor.name;
  }
}
