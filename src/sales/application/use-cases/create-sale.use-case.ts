import { Injectable, Logger } from '@nestjs/common';
import { SaleRepository } from '../../domain/repositories/sale.repository';
import { CustomerRepository } from '../../../customers/domain/repositories/customer.repository';
import { UserRepository } from '../../../users/domain/repositories/user.repository';
import { CustomerId } from '../../../customers/domain/value-objects/customer-id.value-object';
import { UserId } from '../../../users/domain/value-objects/user-id.value-object';
import { CustomerNotFoundException } from '../../../customers/domain/exceptions/customer-not-found.exception';
import { InvalidSaleOperationException } from '../../domain/exceptions/invalid-sale-operation.exception';
import { Sale } from '../../domain/entities/sale.entity';

@Injectable()
export class CreateSaleUseCase {
  private readonly logger = new Logger(CreateSaleUseCase.name);

  constructor(
    private readonly saleRepository: SaleRepository,
    private readonly customerRepository: CustomerRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async execute(params: {
    customerId: string;
    sellerId: string;
    kilograms: number;
    pricePerKilogram: number;
  }): Promise<void> {
    const customerId = CustomerId.from(params.customerId);
    const customer = await this.customerRepository.findById(customerId);

    if (!customer) {
      throw new CustomerNotFoundException();
    }

    const sellerId = UserId.from(params.sellerId);
    const seller = await this.userRepository.findById(sellerId);

    if (!seller) {
      throw new InvalidSaleOperationException('Seller not found');
    }

    if (seller.getStatus().isInactive()) {
      throw new InvalidSaleOperationException('Seller is inactive');
    }

    const sale = Sale.create({
      customerId: params.customerId,
      sellerId: params.sellerId,
      kilograms: params.kilograms,
      pricePerKilogram: params.pricePerKilogram,
    });

    await this.saleRepository.save(sale);

    this.logger.log(
      `Sale created: ID=${sale.getId().toPrimitives()}, CustomerID=${sale.getCustomerId().toPrimitives()}, SellerID=${sale.getSellerId().toPrimitives()}, Total=${sale.getTotalAmount().toPrimitives()}`,
    );
  }
}
