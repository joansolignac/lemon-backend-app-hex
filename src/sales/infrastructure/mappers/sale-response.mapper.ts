import { Sale } from '../../domain/entities/sale.entity';
import { SaleResponseDto } from '../http/dtos/response/sale-response.dto';

export const toSaleResponse = (sale: Sale): SaleResponseDto => ({
  id: sale.getId().toPrimitives(),
  customerId: sale.getCustomerId().toPrimitives(),
  sellerId: sale.getSellerId().toPrimitives(),
  kilograms: sale.getKilograms().toPrimitives(),
  pricePerKilogram: sale.getPricePerKilogram().toPrimitives(),
  totalAmount: sale.getTotalAmount().toPrimitives(),
  paymentStatus: sale.getPaymentStatus().toPrimitives(),
  createdAt: sale.getCreatedAt().toISOString(),
  updatedAt: sale.getUpdatedAt().toISOString(),
});
