import { Injectable, Logger } from '@nestjs/common';
import { Customer } from '../../domain/entities/customer.entity';
import { CustomerRepository } from '../../domain/repositories/customer.repository';
import { CustomerNumDocument } from '../../domain/value-objects/customer-num-document.value-object';
import { CustomerPhone } from '../../domain/value-objects/customer-phone.value-object';
import { CustomerEmail } from '../../domain/value-objects/customer-email.value-object';
import { CustomerAlreadyExistsException } from '../../domain/exceptions/customer-already-exists.exception';

@Injectable()
export class CreateCustomerUseCase {
  private readonly logger = new Logger(CreateCustomerUseCase.name);

  constructor(private readonly repository: CustomerRepository) {}

  async execute(params: {
    name: string;
    typeDocument: string;
    numDocument: string;
    phone: string;
    email: string | null;
    address: string;
  }): Promise<void> {
    const numDocument = CustomerNumDocument.from(params.numDocument);
    const existsByNumDocument =
      await this.repository.existsByNumDocument(numDocument);

    if (existsByNumDocument) {
      throw new CustomerAlreadyExistsException('Num document already exists');
    }

    const phone = CustomerPhone.from(params.phone);
    const existsByPhone = await this.repository.existsByPhone(phone);

    if (existsByPhone) {
      throw new CustomerAlreadyExistsException('Phone already exists');
    }

    if (params.email) {
      const email = CustomerEmail.from(params.email);
      const existsByEmail = await this.repository.existsByEmail(email);

      if (existsByEmail) {
        throw new CustomerAlreadyExistsException('Email already exists');
      }
    }

    const customer = Customer.create({
      name: params.name,
      typeDocument: params.typeDocument,
      numDocument: params.numDocument,
      phone: params.phone,
      email: params.email,
      address: params.address,
    });

    await this.repository.save(customer);

    this.logger.log(
      `Customer created: ID=${customer.getId().toPrimitives()}, Name=${customer.getName().toPrimitives()}, NumDocument=${customer.getNumDocument().toPrimitives()}, TypeDocument=${customer.getTypeDocument().toPrimitives()}`,
    );
  }
}
