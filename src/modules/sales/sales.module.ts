import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { AuthModule } from '../auth/auth.module';
import { SalesController } from './sales.controller';
import { CreateSaleFeature } from './features/create-sale.feature';
import { FindSaleByIdFeature } from './features/find-sale-by-id.feature';
import { GetAllSalesPaginatedFeature } from './features/get-all-sales-paginated.feature';
import { FindSalesByCustomerFeature } from './features/find-sales-by-customer.feature';
import { FindSalesBySellerFeature } from './features/find-sales-by-seller.feature';
import { FindPendingSalesFeature } from './features/find-pending-sales.feature';
import { UpdateSaleFeature } from './features/update-sale.feature';
import { MarkSaleAsPaidFeature } from './features/mark-sale-as-paid.feature';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [SalesController],
  providers: [
    CreateSaleFeature,
    FindSaleByIdFeature,
    GetAllSalesPaginatedFeature,
    FindSalesByCustomerFeature,
    FindSalesBySellerFeature,
    FindPendingSalesFeature,
    UpdateSaleFeature,
    MarkSaleAsPaidFeature,
  ],
})
export class SalesModule {}
