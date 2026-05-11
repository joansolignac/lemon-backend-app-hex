import { Injectable } from '@nestjs/common';
import { HashService } from '../../../../domain/services/hash.service';
import * as argon2 from 'argon2';

@Injectable()
export class Argon2Service extends HashService {
  async hash(value: string): Promise<string> {
    return argon2.hash(value);
  }
  async compare(value: string, hashedValue: string): Promise<boolean> {
    return argon2.verify(hashedValue, value);
  }
}
