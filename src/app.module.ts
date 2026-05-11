import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './shared/infrastructure/persistence/prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { APP_CONFIG } from './shared/infrastructure/config/app.config';
import { DATABASE_CONFIG } from './shared/infrastructure/config/database.config';
import { VALIDATION_SCHEMA } from './shared/infrastructure/config/schema/validation.schema';
import { HashModule } from './shared/infrastructure/security/hash/hash.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [APP_CONFIG, DATABASE_CONFIG],
      validationSchema: VALIDATION_SCHEMA,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    UsersModule,
    PrismaModule,
    HashModule,
  ],
})
export class AppModule {}
