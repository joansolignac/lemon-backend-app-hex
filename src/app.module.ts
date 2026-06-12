import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_CONFIG } from './common/config/app.config';
import { DATABASE_CONFIG } from './common/config/database.config';
import { JWT_CONFIG } from './common/config/jwt.config';
import { VALIDATION_SCHEMA } from './common/config/schema/validation.schema';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { CustomersModule } from './modules/customers/customers.module';
import { SalesModule } from './modules/sales/sales.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [APP_CONFIG, DATABASE_CONFIG, JWT_CONFIG],
      validationSchema: VALIDATION_SCHEMA,
      ignoreEnvFile: process.env.NODE_ENV === 'production',
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    PrismaModule,
    AuthModule,
    UsersModule,
    CustomersModule,
    SalesModule,
  ],
})
export class AppModule {}
