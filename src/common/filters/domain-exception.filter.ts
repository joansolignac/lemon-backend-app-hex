import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { DomainException } from '../exceptions/domain.exception';
import { DomainErrorCode } from '../exceptions/error-code.enum';

const errorCodeToHttpStatus: Record<DomainErrorCode, HttpStatus> = {
  [DomainErrorCode.INVALID_CREDENTIALS]: HttpStatus.UNAUTHORIZED,

  [DomainErrorCode.USER_NOT_FOUND]: HttpStatus.NOT_FOUND,
  [DomainErrorCode.USER_INACTIVE]: HttpStatus.FORBIDDEN,
  [DomainErrorCode.USER_EMAIL_ALREADY_EXISTS]: HttpStatus.CONFLICT,
  [DomainErrorCode.USER_ROLE_ALREADY_HAS]: HttpStatus.CONFLICT,
  [DomainErrorCode.USER_ALREADY_ACTIVE]: HttpStatus.CONFLICT,
  [DomainErrorCode.USER_ALREADY_INACTIVE]: HttpStatus.CONFLICT,
  [DomainErrorCode.USER_UPDATE_NO_CHANGES_DETECTED]: HttpStatus.BAD_REQUEST,

  [DomainErrorCode.CUSTOMER_NOT_FOUND]: HttpStatus.NOT_FOUND,
  [DomainErrorCode.CUSTOMER_ALREADY_ACTIVE]: HttpStatus.CONFLICT,
  [DomainErrorCode.CUSTOMER_ALREADY_INACTIVE]: HttpStatus.CONFLICT,
  [DomainErrorCode.CUSTOMER_ALREADY_EXISTS]: HttpStatus.CONFLICT,
  [DomainErrorCode.CUSTOMER_UPDATE_NO_CHANGES_DETECTED]: HttpStatus.BAD_REQUEST,

  [DomainErrorCode.SALE_NOT_FOUND]: HttpStatus.NOT_FOUND,
  [DomainErrorCode.INVALID_SALE_OPERATION]: HttpStatus.CONFLICT,
  [DomainErrorCode.SALE_UPDATE_NO_CHANGES_DETECTED]: HttpStatus.BAD_REQUEST,
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
