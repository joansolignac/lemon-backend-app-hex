import { Injectable, Logger } from '@nestjs/common';
import { SaleRepository } from '../../domain/repositories/sale.repository';
import { Sale } from '../../domain/entities/sale.entity';
import { SaleId } from '../../domain/value-objects/sale-id.value-object';
import { SaleNotFoundException } from '../../domain/exceptions/sale-not-found.exception';

@Injectable()
export class SaleFinderService {
  private readonly logger = new Logger(SaleFinderService.name);

  constructor(private readonly repository: SaleRepository) {}

  async findByIdOrFail(id: string): Promise<Sale> {
    const saleId = SaleId.from(id);
    const sale = await this.repository.findById(saleId);

    if (!sale) {
      throw new SaleNotFoundException();
    }

    return sale;
  }
}
