import { Module } from '@nestjs/common';
import { CreateSaleUseCase } from './application/use-cases/create-sale.use-case';
import { FindSaleByIdUseCase } from './application/use-cases/find-sale-by-id.use-case';
import { FindSalesByCustomerUseCase } from './application/use-cases/find-sales-by-customer.use-case';
import { FindSalesBySellerUseCase } from './application/use-cases/find-sales-by-seller.use-case';
import { FindPendingSalesUseCase } from './application/use-cases/find-pending-sales.use-case';
import { GetAllSalesPaginatedUseCase } from './application/use-cases/get-all-sales-paginated.use-case';
import { UpdateSaleUseCase } from './application/use-cases/update-sale.use-case';
import { MarkSaleAsPaidUseCase } from './application/use-cases/mark-sale-as-paid.use-case';
import { SaleController } from './infrastructure/http/controllers/sale.controller';
import { PrismaSaleRepository } from './infrastructure/persistence/prisma/prisma-sale.repository';
import { SaleRepository } from './domain/repositories/sale.repository';
import { SaleFinderService } from './application/services/sale-finder.service';
import { PrismaModule } from '../shared/infrastructure/persistence/prisma/prisma.module';
import { AuthSharedModule } from '../shared/infrastructure/security/auth/auth-shared.module';
import { CustomersModule } from '../customers/customers.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [PrismaModule, AuthSharedModule, CustomersModule, UsersModule],
  providers: [
    CreateSaleUseCase,
    FindSaleByIdUseCase,
    FindSalesByCustomerUseCase,
    FindSalesBySellerUseCase,
    FindPendingSalesUseCase,
    GetAllSalesPaginatedUseCase,
    UpdateSaleUseCase,
    MarkSaleAsPaidUseCase,
    SaleFinderService,
    {
      provide: SaleRepository,
      useClass: PrismaSaleRepository,
    },
  ],
  controllers: [SaleController],
  exports: [SaleRepository, FindSaleByIdUseCase],
})
export class SalesModule {}
