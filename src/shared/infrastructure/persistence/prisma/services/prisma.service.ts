import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor(private readonly config: ConfigService) {
    const connectionString = config.getOrThrow<string>('database.url');
    const pool = new Pool({
      connectionString,
    });
    const adapter = new PrismaPg(pool);
    super({ adapter });
  }
  async onModuleDestroy(): Promise<void> {
    await this.$disconnect();
  }
  async onModuleInit(): Promise<void> {
    await this.$connect();
  }
}
