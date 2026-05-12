import { Prisma } from '@prisma/client';
import { Customer } from '../../../../domain/entities/customer.entity';
import { CustomerId } from '../../../../domain/value-objects/customer-id.value-object';
import { CustomerName } from '../../../../domain/value-objects/customer-name.value-object';
import { CustomerTypeDocument } from '../../../../domain/value-objects/customer-type-document.value-object';
import { CustomerNumDocument } from '../../../../domain/value-objects/customer-num-document.value-object';
import { CustomerPhone } from '../../../../domain/value-objects/customer-phone.value-object';
import { CustomerEmail } from '../../../../domain/value-objects/customer-email.value-object';
import { CustomerAddress } from '../../../../domain/value-objects/customer-address.value-object';
import { CustomerStatus } from '../../../../domain/value-objects/customer-status.value-object';

export type PrismaCustomer = Prisma.CustomerGetPayload<Record<string, never>>;

export const toCustomerDomain = (customer: PrismaCustomer): Customer => {
  const customerId = CustomerId.from(customer.id);
  const customerName = CustomerName.from(customer.name);
  const customerTypeDocument = CustomerTypeDocument.from(customer.typeDocument);
  const customerNumDocument = CustomerNumDocument.from(customer.numDocument);
  const customerPhone = CustomerPhone.from(customer.phone);
  const customerEmail = customer.email
    ? CustomerEmail.from(customer.email)
    : null;
  const customerAddress = CustomerAddress.from(customer.address);
  const customerStatus = CustomerStatus.from(customer.status);
  const createdAt = customer.createdAt;
  const updatedAt = customer.updatedAt;

  return Customer.from(
    customerId,
    customerName,
    customerTypeDocument,
    customerNumDocument,
    customerPhone,
    customerEmail,
    customerAddress,
    customerStatus,
    createdAt,
    updatedAt,
  );
};

export const toCustomersDomainList = (
  customers: PrismaCustomer[],
): Customer[] => {
  return customers.map(toCustomerDomain);
};
