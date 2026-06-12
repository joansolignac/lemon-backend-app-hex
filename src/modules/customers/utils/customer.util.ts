import { PrismaService } from '../../../prisma/prisma.service';
import { CustomerNotFoundException } from '../exceptions/customer-not-found.exception';

export async function ensureCustomerById(prisma: PrismaService, id: string) {
  const customer = await prisma.customer.findUnique({ where: { id } });
  if (!customer) throw new CustomerNotFoundException();
  return customer;
}
