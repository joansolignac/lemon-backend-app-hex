import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { CustomersModule } from './customers/customers.module';
import { SalesModule } from './sales/sales.module';
import { PrismaModule } from './shared/infrastructure/persistence/prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { APP_CONFIG } from './shared/infrastructure/config/app.config';
import { DATABASE_CONFIG } from './shared/infrastructure/config/database.config';
import { VALIDATION_SCHEMA } from './shared/infrastructure/config/schema/validation.schema';
import { HashModule } from './shared/infrastructure/security/hash/hash.module';
import { AuthModule } from './auth/auth.module';
import { JWT_CONFIG } from './shared/infrastructure/config/jwt.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [APP_CONFIG, DATABASE_CONFIG, JWT_CONFIG],
      validationSchema: VALIDATION_SCHEMA,
      ignoreEnvFile: process.env.NODE_ENV === 'production',
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    UsersModule,
    CustomersModule,
    SalesModule,
    PrismaModule,
    HashModule,
    AuthModule,
  ],
})
export class AppModule {}
