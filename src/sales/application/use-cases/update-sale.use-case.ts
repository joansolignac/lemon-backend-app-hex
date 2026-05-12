import { Injectable, Logger } from '@nestjs/common';
import { SaleRepository } from '../../domain/repositories/sale.repository';
import { SaleFinderService } from '../services/sale-finder.service';
import { SaleKilograms } from '../../domain/value-objects/sale-kilograms.value-object';
import { SalePricePerKilogram } from '../../domain/value-objects/sale-price-per-kilogram.value-object';
import { SalePaymentStatus } from '../../domain/value-objects/sale-payment-status.value-object';
import { SaleUpdateNoChangesDetectedException } from '../../domain/exceptions/sale-update-no-changes-detected.exception';

@Injectable()
export class UpdateSaleUseCase {
  private readonly logger = new Logger(UpdateSaleUseCase.name);

  constructor(
    private readonly saleRepository: SaleRepository,
    private readonly saleFinder: SaleFinderService,
  ) {}

  async execute(
    id: string,
    params: {
      kilograms?: number;
      pricePerKilogram?: number;
      paymentStatus?: string;
    },
  ): Promise<void> {
    const sale = await this.saleFinder.findByIdOrFail(id);

    const saleKilograms = params.kilograms
      ? SaleKilograms.from(params.kilograms)
      : undefined;
    const salePrice = params.pricePerKilogram
      ? SalePricePerKilogram.from(params.pricePerKilogram)
      : undefined;
    const saleStatus = params.paymentStatus
      ? SalePaymentStatus.from(params.paymentStatus)
      : undefined;

    if (!saleKilograms && !salePrice && !saleStatus) {
      throw new SaleUpdateNoChangesDetectedException();
    }

    sale.update({
      kilograms: saleKilograms,
      pricePerKilogram: salePrice,
      paymentStatus: saleStatus,
    });

    await this.saleRepository.save(sale);

    this.logger.log(
      `Sale updated: ID=${sale.getId().toPrimitives()}, Updated fields: ${Object.keys(params).join(', ')}`,
    );
  }
}
