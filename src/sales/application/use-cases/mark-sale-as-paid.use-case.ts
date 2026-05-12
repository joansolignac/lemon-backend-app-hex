import { Injectable, Logger } from '@nestjs/common';
import { SaleRepository } from '../../domain/repositories/sale.repository';
import { SaleFinderService } from '../services/sale-finder.service';

@Injectable()
export class MarkSaleAsPaidUseCase {
  private readonly logger = new Logger(MarkSaleAsPaidUseCase.name);

  constructor(
    private readonly saleRepository: SaleRepository,
    private readonly saleFinder: SaleFinderService,
  ) {}

  async execute(id: string): Promise<void> {
    const sale = await this.saleFinder.findByIdOrFail(id);

    sale.markAsPaid();

    await this.saleRepository.save(sale);

    this.logger.log(
      `Sale marked as paid: ID=${sale.getId().toPrimitives()}, Total=${sale.getTotalAmount().toPrimitives()}`,
    );
  }
}
