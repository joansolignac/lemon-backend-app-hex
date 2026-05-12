import { CustomerNumDocumentRequiredException } from '../exceptions/customer-num-document-required.exception';
import { CustomerNumDocumentInvalidFormatException } from '../exceptions/customer-num-document-invalid-format.exception';

export class CustomerNumDocument {
  private constructor(private readonly numDocument: string) {
    const normalizedNumDocument = this.normalize(numDocument);
    this.validateRequired(normalizedNumDocument);
    this.validateRegex(normalizedNumDocument);
    this.numDocument = normalizedNumDocument;
  }

  static from(value: string): CustomerNumDocument {
    return new CustomerNumDocument(value);
  }

  private normalize(value: string): string {
    return value?.trim();
  }

  private validateRequired(value: string): void {
    if (!value) {
      throw new CustomerNumDocumentRequiredException();
    }
  }

  private validateRegex(value: string): void {
    const DNI_REGEX = /^\d{8}$/;
    const RUC_REGEX = /^\d{11}$/;

    if (!DNI_REGEX.test(value) && !RUC_REGEX.test(value)) {
      throw new CustomerNumDocumentInvalidFormatException();
    }
  }

  toPrimitives(): string {
    return this.numDocument;
  }
}
