import { CustomerTypeDocumentRequiredException } from '../exceptions/customer-type-document-required.exception';
import { CustomerTypeDocumentInvalidException } from '../exceptions/customer-type-document-invalid.exception';

export const CUSTOMER_TYPE_DOCUMENT = {
  DNI: 'DNI',
  RUC: 'RUC',
} as const;

export type CustomerTypeDocumentType =
  (typeof CUSTOMER_TYPE_DOCUMENT)[keyof typeof CUSTOMER_TYPE_DOCUMENT];

export class CustomerTypeDocument {
  private readonly typeDocument: CustomerTypeDocumentType;

  private constructor(private readonly value: string) {
    const normalizedTypeDocument = this.normalize(value);
    this.validateRequired(normalizedTypeDocument);
    this.validateType(normalizedTypeDocument);
    this.typeDocument = normalizedTypeDocument as CustomerTypeDocumentType;
  }

  static from(value: string): CustomerTypeDocument {
    return new CustomerTypeDocument(value);
  }

  private normalize(value: string): string {
    return value?.trim().toUpperCase();
  }

  private validateRequired(value: string): void {
    if (!value) {
      throw new CustomerTypeDocumentRequiredException();
    }
  }

  private validateType(value: string): void {
    if (
      !Object.values(CUSTOMER_TYPE_DOCUMENT).includes(
        value as CustomerTypeDocumentType,
      )
    ) {
      throw new CustomerTypeDocumentInvalidException();
    }
  }

  toPrimitives(): string {
    return this.typeDocument;
  }
}
