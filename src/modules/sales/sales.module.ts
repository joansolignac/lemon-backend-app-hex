import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { AuthModule } from '../auth/auth.module';
import { SalesController } from './sales.controller';
import { CreateSaleFeature } from './features/create-sale.feature';
import { FindSalesFeature } from './features/find-sales.feature';
import { UpdateSaleFeature } from './features/update-sale.feature';
import { MarkSaleAsPaidFeature } from './features/mark-sale-as-paid.feature';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [SalesController],
  providers: [
    CreateSaleFeature,
    FindSalesFeature,
    UpdateSaleFeature,
    MarkSaleAsPaidFeature,
  ],
})
export class SalesModule {}
