import { Injectable, Logger } from '@nestjs/common';
import { CustomerRepository } from '../../domain/repositories/customer.repository';
import { CustomerFinderService } from '../services/customer-finder.service';
import { CustomerName } from '../../domain/value-objects/customer-name.value-object';
import { CustomerPhone } from '../../domain/value-objects/customer-phone.value-object';
import { CustomerEmail } from '../../domain/value-objects/customer-email.value-object';
import { CustomerAddress } from '../../domain/value-objects/customer-address.value-object';
import { CustomerAlreadyExistsException } from '../../domain/exceptions/customer-already-exists.exception';
import { CustomerUpdateNoChangesDetectedException } from '../../domain/exceptions/customer-update-no-changes-detected.exception';

@Injectable()
export class UpdateCustomerUseCase {
  private readonly logger = new Logger(UpdateCustomerUseCase.name);

  constructor(
    private readonly repository: CustomerRepository,
    private readonly customerFinder: CustomerFinderService,
  ) {}

  async execute(
    id: string,
    params: {
      name?: string;
      phone?: string;
      email?: string | null;
      address?: string;
    },
  ): Promise<void> {
    const customer = await this.customerFinder.findByIdOrFail(id);

    const customerName = params.name
      ? CustomerName.from(params.name)
      : undefined;
    const customerPhone = params.phone
      ? CustomerPhone.from(params.phone)
      : undefined;
    const customerEmail =
      params.email !== undefined ? CustomerEmail.from(params.email) : undefined;
    const customerAddress = params.address
      ? CustomerAddress.from(params.address)
      : undefined;

    if (
      !customerName &&
      !customerPhone &&
      customerEmail === undefined &&
      !customerAddress
    ) {
      throw new CustomerUpdateNoChangesDetectedException();
    }

    if (customerPhone) {
      const existsPhone = await this.repository.existsByPhone(customerPhone);
      if (
        existsPhone &&
        customerPhone.toPrimitives() !== customer.getPhone().toPrimitives()
      ) {
        throw new CustomerAlreadyExistsException('Phone already exists');
      }
    }

    if (customerEmail && customerEmail.toPrimitives() !== null) {
      const existsEmail = await this.repository.existsByEmail(customerEmail);
      const currentEmail = customer.getEmail()?.toPrimitives();
      if (existsEmail && customerEmail.toPrimitives() !== currentEmail) {
        throw new CustomerAlreadyExistsException('Email already exists');
      }
    }

    customer.updateProfile({
      name: customerName,
      phone: customerPhone,
      email: customerEmail,
      address: customerAddress,
    });

    await this.repository.save(customer);

    this.logger.log(
      `Customer updated: ID=${customer.getId().toPrimitives()}, Updated fields: ${Object.keys(params).join(', ')}`,
    );
  }
}
