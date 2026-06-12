import type { TypeDocument } from '@prisma/client';

export type CreateCustomerInput = {
  name: string;
  typeDocument: TypeDocument;
  numDocument: string;
  phone: string;
  email: string | null;
  address: string;
};
