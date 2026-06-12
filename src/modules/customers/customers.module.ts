import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { AuthModule } from '../auth/auth.module';
import { CustomersController } from './customers.controller';
import { CreateCustomerFeature } from './features/create-customer.feature';
import { FindCustomerByIdFeature } from './features/find-customer-by-id.feature';
import { FindCustomerByNumDocumentFeature } from './features/find-customer-by-num-document.feature';
import { GetAllCustomersPaginatedFeature } from './features/get-all-customers-paginated.feature';
import { UpdateCustomerFeature } from './features/update-customer.feature';
import { ActivateCustomerFeature } from './features/activate-customer.feature';
import { DeactivateCustomerFeature } from './features/deactivate-customer.feature';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [CustomersController],
  providers: [
    CreateCustomerFeature,
    FindCustomerByIdFeature,
    FindCustomerByNumDocumentFeature,
    GetAllCustomersPaginatedFeature,
    UpdateCustomerFeature,
    ActivateCustomerFeature,
    DeactivateCustomerFeature,
  ],
})
export class CustomersModule {}
