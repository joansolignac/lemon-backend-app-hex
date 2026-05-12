import { CustomerId } from '../value-objects/customer-id.value-object';
import { CustomerName } from '../value-objects/customer-name.value-object';
import { CustomerTypeDocument } from '../value-objects/customer-type-document.value-object';
import { CustomerNumDocument } from '../value-objects/customer-num-document.value-object';
import { CustomerPhone } from '../value-objects/customer-phone.value-object';
import { CustomerEmail } from '../value-objects/customer-email.value-object';
import { CustomerAddress } from '../value-objects/customer-address.value-object';
import { CustomerStatus } from '../value-objects/customer-status.value-object';
import { CustomerUpdateNoChangesDetectedException } from '../exceptions/customer-update-no-changes-detected.exception';
import { CustomerAlreadyInactiveException } from '../exceptions/customer-already-inactive.exception';
import { CustomerAlreadyActiveException } from '../exceptions/customer-already-active.exception';

export class Customer {
  private constructor(
    private readonly id: CustomerId,
    private name: CustomerName,
    private readonly typeDocument: CustomerTypeDocument,
    private readonly numDocument: CustomerNumDocument,
    private phone: CustomerPhone,
    private email: CustomerEmail | null,
    private address: CustomerAddress,
    private status: CustomerStatus,
    private readonly createdAt: Date,
    private updatedAt: Date,
  ) {}

  static create(params: {
    name: string;
    typeDocument: string;
    numDocument: string;
    phone: string;
    email: string | null;
    address: string;
  }): Customer {
    const CUSTOMER_ID = CustomerId.generate();
    const CUSTOMER_NAME = CustomerName.from(params.name);
    const CUSTOMER_TYPE_DOCUMENT = CustomerTypeDocument.from(
      params.typeDocument,
    );
    const CUSTOMER_NUM_DOCUMENT = CustomerNumDocument.from(params.numDocument);
    const CUSTOMER_PHONE = CustomerPhone.from(params.phone);
    const CUSTOMER_EMAIL = CustomerEmail.from(params.email);
    const CUSTOMER_ADDRESS = CustomerAddress.from(params.address);
    const CUSTOMER_STATUS = CustomerStatus.generateActive();
    const NOW = new Date();

    return new Customer(
      CUSTOMER_ID,
      CUSTOMER_NAME,
      CUSTOMER_TYPE_DOCUMENT,
      CUSTOMER_NUM_DOCUMENT,
      CUSTOMER_PHONE,
      CUSTOMER_EMAIL,
      CUSTOMER_ADDRESS,
      CUSTOMER_STATUS,
      NOW,
      NOW,
    );
  }

  static from(
    id: CustomerId,
    name: CustomerName,
    typeDocument: CustomerTypeDocument,
    numDocument: CustomerNumDocument,
    phone: CustomerPhone,
    email: CustomerEmail | null,
    address: CustomerAddress,
    status: CustomerStatus,
    createdAt: Date,
    updatedAt: Date,
  ): Customer {
    return new Customer(
      id,
      name,
      typeDocument,
      numDocument,
      phone,
      email,
      address,
      status,
      createdAt,
      updatedAt,
    );
  }

  getId(): CustomerId {
    return this.id;
  }

  getName(): CustomerName {
    return this.name;
  }

  getTypeDocument(): CustomerTypeDocument {
    return this.typeDocument;
  }

  getNumDocument(): CustomerNumDocument {
    return this.numDocument;
  }

  getPhone(): CustomerPhone {
    return this.phone;
  }

  getEmail(): CustomerEmail | null {
    return this.email;
  }

  getAddress(): CustomerAddress {
    return this.address;
  }

  getStatus(): CustomerStatus {
    return this.status;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  getUpdatedAt(): Date {
    return this.updatedAt;
  }

  updateProfile(params: {
    name?: CustomerName;
    phone?: CustomerPhone;
    email?: CustomerEmail;
    address?: CustomerAddress;
  }): void {
    if (!params.name && !params.phone && !params.email && !params.address) {
      throw new CustomerUpdateNoChangesDetectedException();
    }

    if (params.name) {
      this.name = params.name;
    }

    if (params.phone) {
      this.phone = params.phone;
    }

    if (params.email !== undefined) {
      this.email = params.email;
    }

    if (params.address) {
      this.address = params.address;
    }

    this.touch();
  }

  activate(): void {
    if (this.status.isActive()) {
      throw new CustomerAlreadyActiveException();
    }

    this.status = CustomerStatus.generateActive();

    this.touch();
  }

  deactivate(): void {
    if (this.status.isInactive()) {
      throw new CustomerAlreadyInactiveException();
    }

    this.status = CustomerStatus.generateInactive();

    this.touch();
  }

  private touch(): void {
    this.updatedAt = new Date();
  }
}
