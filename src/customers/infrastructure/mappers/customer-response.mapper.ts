import { Customer } from '../../domain/entities/customer.entity';
import { CustomerResponseDto } from '../http/dtos/response/customer-response.dto';

export const toCustomerResponse = (
  customer: Customer,
): CustomerResponseDto => ({
  id: customer.getId().toPrimitives(),
  name: customer.getName().toPrimitives(),
  typeDocument: customer.getTypeDocument().toPrimitives(),
  numDocument: customer.getNumDocument().toPrimitives(),
  phone: customer.getPhone().toPrimitives(),
  email: customer.getEmail()?.toPrimitives() ?? null,
  address: customer.getAddress().toPrimitives(),
  status: customer.getStatus().toPrimitives(),
  createdAt: customer.getCreatedAt().toISOString(),
  updatedAt: customer.getUpdatedAt().toISOString(),
});
