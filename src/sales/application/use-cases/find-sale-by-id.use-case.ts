import { Injectable, Logger } from '@nestjs/common';
import { SaleRepository } from '../../domain/repositories/sale.repository';
import { SaleFinderService } from '../services/sale-finder.service';
import { Sale } from '../../domain/entities/sale.entity';

@Injectable()
export class FindSaleByIdUseCase {
  private readonly logger = new Logger(FindSaleByIdUseCase.name);

  constructor(
    private readonly saleRepository: SaleRepository,
    private readonly saleFinder: SaleFinderService,
  ) {}

  async execute(id: string): Promise<Sale> {
    const sale = await this.saleFinder.findByIdOrFail(id);

    this.logger.log(
      `Sale found by ID: ${sale.getId().toPrimitives()}, CustomerID=${sale.getCustomerId().toPrimitives()}, Total=${sale.getTotalAmount().toPrimitives()}, Status=${sale.getPaymentStatus().toPrimitives()}`,
    );

    return sale;
  }
}
