import { PrismaService } from '../../../prisma/prisma.service';
import { SaleNotFoundException } from '../exceptions/sale-not-found.exception';

export async function ensureSaleById(prisma: PrismaService, id: string) {
  const sale = await prisma.sale.findUnique({ where: { id } });
  if (!sale) throw new SaleNotFoundException();
  return sale;
}
