import { Module } from '@nestjs/common';
import { CreateCustomerUseCase } from './application/use-cases/create-customer.use-case';
import { FindCustomerByIdUseCase } from './application/use-cases/find-customer-by-id.use-case';
import { DeactivateCustomerUseCase } from './application/use-cases/deactivate-customer.use-case';
import { GetAllCustomersPaginatedUseCase } from './application/use-cases/get-all-customers-paginated.use-case';
import { ActivateCustomerUseCase } from './application/use-cases/activate-customer.use-case';
import { UpdateCustomerUseCase } from './application/use-cases/update-customer.use-case';
import { FindCustomerByNumDocumentUseCase } from './application/use-cases/find-customer-by-num-document.use-case';
import { CustomerController } from './infrastructure/http/controllers/customer.controller';
import { PrismaCustomerRepository } from './infrastructure/persistence/prisma/prisma-customer.repository';
import { CustomerRepository } from './domain/repositories/customer.repository';
import { CustomerFinderService } from './application/services/customer-finder.service';
import { PrismaModule } from '../shared/infrastructure/persistence/prisma/prisma.module';
import { AuthSharedModule } from '../shared/infrastructure/security/auth/auth-shared.module';

@Module({
  imports: [PrismaModule, AuthSharedModule],
  providers: [
    CreateCustomerUseCase,
    FindCustomerByIdUseCase,
    GetAllCustomersPaginatedUseCase,
    ActivateCustomerUseCase,
    DeactivateCustomerUseCase,
    UpdateCustomerUseCase,
    FindCustomerByNumDocumentUseCase,
    CustomerFinderService,
    {
      provide: CustomerRepository,
      useClass: PrismaCustomerRepository,
    },
  ],
  controllers: [CustomerController],
  exports: [CustomerRepository, FindCustomerByIdUseCase],
})
export class CustomersModule {}
