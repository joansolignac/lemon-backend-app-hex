import { SaleId } from '../value-objects/sale-id.value-object';
import { CustomerId } from '../../../customers/domain/value-objects/customer-id.value-object';
import { UserId } from '../../../users/domain/value-objects/user-id.value-object';
import { SaleKilograms } from '../value-objects/sale-kilograms.value-object';
import { SalePricePerKilogram } from '../value-objects/sale-price-per-kilogram.value-object';
import { SaleTotalAmount } from '../value-objects/sale-total-amount.value-object';
import { SalePaymentStatus } from '../value-objects/sale-payment-status.value-object';
import { InvalidSaleOperationException } from '../exceptions/invalid-sale-operation.exception';
import { SaleUpdateNoChangesDetectedException } from '../exceptions/sale-update-no-changes-detected.exception';

export class Sale {
  private constructor(
    private readonly id: SaleId,
    private readonly customerId: CustomerId,
    private readonly sellerId: UserId,
    private kilograms: SaleKilograms,
    private pricePerKilogram: SalePricePerKilogram,
    private totalAmount: SaleTotalAmount,
    private paymentStatus: SalePaymentStatus,
    private readonly createdAt: Date,
    private updatedAt: Date,
  ) {}

  static create(params: {
    customerId: string;
    sellerId: string;
    kilograms: number;
    pricePerKilogram: number;
  }): Sale {
    const SALE_ID = SaleId.generate();
    const CUSTOMER_ID = CustomerId.from(params.customerId);
    const SELLER_ID = UserId.from(params.sellerId);
    const SALE_KILOGRAMS = SaleKilograms.from(params.kilograms);
    const SALE_PRICE = SalePricePerKilogram.from(params.pricePerKilogram);
    const TOTAL = parseFloat(
      (params.kilograms * params.pricePerKilogram).toFixed(2),
    );
    const SALE_TOTAL = SaleTotalAmount.from(TOTAL);
    const SALE_STATUS = SalePaymentStatus.generatePending();
    const NOW = new Date();

    return new Sale(
      SALE_ID,
      CUSTOMER_ID,
      SELLER_ID,
      SALE_KILOGRAMS,
      SALE_PRICE,
      SALE_TOTAL,
      SALE_STATUS,
      NOW,
      NOW,
    );
  }

  static from(
    id: SaleId,
    customerId: CustomerId,
    sellerId: UserId,
    kilograms: SaleKilograms,
    pricePerKilogram: SalePricePerKilogram,
    totalAmount: SaleTotalAmount,
    paymentStatus: SalePaymentStatus,
    createdAt: Date,
    updatedAt: Date,
  ): Sale {
    return new Sale(
      id,
      customerId,
      sellerId,
      kilograms,
      pricePerKilogram,
      totalAmount,
      paymentStatus,
      createdAt,
      updatedAt,
    );
  }

  getId(): SaleId {
    return this.id;
  }

  getCustomerId(): CustomerId {
    return this.customerId;
  }

  getSellerId(): UserId {
    return this.sellerId;
  }

  getKilograms(): SaleKilograms {
    return this.kilograms;
  }

  getPricePerKilogram(): SalePricePerKilogram {
    return this.pricePerKilogram;
  }

  getTotalAmount(): SaleTotalAmount {
    return this.totalAmount;
  }

  getPaymentStatus(): SalePaymentStatus {
    return this.paymentStatus;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  getUpdatedAt(): Date {
    return this.updatedAt;
  }

  update(params: {
    kilograms?: SaleKilograms;
    pricePerKilogram?: SalePricePerKilogram;
    paymentStatus?: SalePaymentStatus;
  }): void {
    if (!params.kilograms && !params.pricePerKilogram && !params.paymentStatus) {
      throw new SaleUpdateNoChangesDetectedException();
    }

    let shouldRecalculate = false;

    if (params.kilograms) {
      this.kilograms = params.kilograms;
      shouldRecalculate = true;
    }

    if (params.pricePerKilogram) {
      this.pricePerKilogram = params.pricePerKilogram;
      shouldRecalculate = true;
    }

    if (params.paymentStatus) {
      this.paymentStatus = params.paymentStatus;
    }

    if (shouldRecalculate) {
      const TOTAL = parseFloat(
        (this.kilograms.toPrimitives() * this.pricePerKilogram.toPrimitives()).toFixed(2),
      );
      this.totalAmount = SaleTotalAmount.from(TOTAL);
    }

    this.touch();
  }

  markAsPaid(): void {
    if (this.paymentStatus.isPaid()) {
      throw new InvalidSaleOperationException('Sale is already paid');
    }

    this.paymentStatus = SalePaymentStatus.generatePaid();
    this.touch();
  }

  private touch(): void {
    this.updatedAt = new Date();
  }
}
