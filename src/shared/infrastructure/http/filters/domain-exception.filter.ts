import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { DomainException } from '../../../domain/exceptions/domain.exception';
import { DomainErrorCode } from '../../../domain/exceptions/error-code.enum';

const errorCodeToHttpStatus: Record<DomainErrorCode, HttpStatus> = {
  [DomainErrorCode.INVALID_CREDENTIALS]: HttpStatus.UNAUTHORIZED,

  [DomainErrorCode.USER_NOT_FOUND]: HttpStatus.NOT_FOUND,

  [DomainErrorCode.USER_INACTIVE]: HttpStatus.FORBIDDEN,

  [DomainErrorCode.USER_EMAIL_ALREADY_EXISTS]: HttpStatus.CONFLICT,
  [DomainErrorCode.USER_ROLE_ALREADY_HAS]: HttpStatus.CONFLICT,
  [DomainErrorCode.USER_ALREADY_ACTIVE]: HttpStatus.CONFLICT,
  [DomainErrorCode.USER_ALREADY_INACTIVE]: HttpStatus.CONFLICT,
  [DomainErrorCode.USER_UPDATE_NO_CHANGES_DETECTED]: HttpStatus.BAD_REQUEST,

  [DomainErrorCode.USER_EMAIL_REQUIRED]: HttpStatus.BAD_REQUEST,
  [DomainErrorCode.USER_EMAIL_INVALID_FORMAT]: HttpStatus.BAD_REQUEST,

  [DomainErrorCode.USER_HASHED_PASSWORD_REQUIRED]: HttpStatus.BAD_REQUEST,
  [DomainErrorCode.USER_HASHED_PASSWORD_TOO_LONG]: HttpStatus.BAD_REQUEST,
  [DomainErrorCode.USER_HASHED_PASSWORD_INVALID_FORMAT]: HttpStatus.BAD_REQUEST,

  [DomainErrorCode.USER_ID_REQUIRED]: HttpStatus.BAD_REQUEST,
  [DomainErrorCode.USER_ID_INVALID_FORMAT]: HttpStatus.BAD_REQUEST,

  [DomainErrorCode.USER_NAME_REQUIRED]: HttpStatus.BAD_REQUEST,
  [DomainErrorCode.USER_NAME_TOO_LONG]: HttpStatus.BAD_REQUEST,
  [DomainErrorCode.USER_NAME_INVALID_FORMAT]: HttpStatus.BAD_REQUEST,

  [DomainErrorCode.USER_ROLE_REQUIRED]: HttpStatus.BAD_REQUEST,
  [DomainErrorCode.USER_ROLE_INVALID]: HttpStatus.BAD_REQUEST,

  [DomainErrorCode.USER_STATUS_REQUIRED]: HttpStatus.BAD_REQUEST,
  [DomainErrorCode.USER_STATUS_INVALID]: HttpStatus.BAD_REQUEST,

  [DomainErrorCode.PAGINATED_RESULT_DATA_INVALID]: HttpStatus.BAD_REQUEST,
  [DomainErrorCode.PAGINATED_RESULT_TOTAL_INVALID]: HttpStatus.BAD_REQUEST,
};

@Catch(DomainException)
export class DomainExceptionFilter implements ExceptionFilter {
  catch(exception: DomainException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status =
      errorCodeToHttpStatus[exception.code] ?? HttpStatus.BAD_REQUEST;

    response.status(status).json({
      statusCode: status,
      code: exception.code,
      message: exception.message,
    });
  }
}
