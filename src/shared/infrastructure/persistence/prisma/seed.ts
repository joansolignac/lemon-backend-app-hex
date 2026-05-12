import dotenv from 'dotenv';

dotenv.config({
  path: '.env.development',
});

import * as argon2 from 'argon2';

import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

import { Pool } from 'pg';
import { UserId } from '../../../../users/domain/value-objects/user-id.value-object';

const databaseUrl = process.env.DATABASE_URL!;

const pool = new Pool({
  connectionString: databaseUrl,
});

const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({
  adapter,
});

async function main(): Promise<void> {
  await prisma.user.upsert({
    where: {
      email: 'admin@admin.com',
    },

    update: {},

    create: {
      id: UserId.generate().toPrimitives(),
      role: 'ADMINISTRADOR',
      name: 'ADMINISTRADOR',
      email: 'admin@admin.com',
      hashedPassword: await argon2.hash('1234567890'),
      status: 'ACTIVE',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  console.log('Administrador creado.');
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
