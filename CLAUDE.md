# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development
npm run start:dev          # Start with watch mode (loads .env.development)
npm run build              # Compile TypeScript via nest build
npm run lint               # ESLint with auto-fix

# Testing
npm run test               # Run all unit tests (loads .env.test)
npm run test:watch         # Jest in watch mode
npm run test:e2e           # End-to-end tests

# Database (always scoped to an env file)
npm run prisma:dev:migrate       # Create + apply a new migration (development)
npm run prisma:dev:deploy        # Apply pending migrations without prompting
npm run prisma:dev:reset         # Drop + recreate DB and re-run all migrations
npm run prisma:dev:studio        # Open Prisma Studio
npm run db:seed:dev              # Run seed against development DB

# Production
npm run start:prod         # node dist/src/main.js
```

Environment files are named `.env.development` and `.env.test`. Required variables (validated by Joi at startup):

```
DATABASE_URL=postgresql://...
JWT_ACCESS_SECRET=<min 32 chars>
JWT_REFRESH_SECRET=<min 32 chars>
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d
PORT=3000           # optional, defaults to 3000
```

## Architecture

**Feature-Oriented Modular** — each feature class maps to one HTTP operation. Controllers are thin; all logic lives in `Feature` classes that inject `PrismaService` directly.

```
src/
├── common/                          # Cross-cutting concerns (no NestJS providers)
│   ├── constants/role.constant.ts   # ROLE enum { ADMINISTRADOR, SUPERVISOR }
│   ├── dtos/                        # PaginatedQueryDto, PaginatedResultResponseDto
│   ├── exceptions/                  # DomainException base class + DomainErrorCode enum
│   ├── filters/domain-exception.filter.ts  # Maps DomainErrorCode → HTTP status
│   ├── interfaces/auth-current-user.interface.ts  # { id, email, role }
│   └── utils/pagination.util.ts     # resolvePagination(page, limit) → { skip, take, page, limit }
│
├── modules/                         # Business modules
│   ├── auth/                        # Login + refresh token; owns JwtModule
│   ├── customers/                   # Customer CRUD + activate/deactivate
│   ├── sales/                       # Sale CRUD + pay; cross-module utils for user/customer lookup
│   └── users/                       # User CRUD + activate/deactivate + password/role change
│
└── shared/infrastructure/           # Technical infrastructure (no domain logic)
    ├── config/                      # app.config, database.config, jwt.config (NestJS ConfigModule)
    ├── persistence/prisma/          # PrismaModule, PrismaService, seed.ts
    └── security/
        ├── auth/                    # JWT strategies, guards, decorators; AuthSharedModule
        └── hash/                   # HashModule → exports Argon2Service
```

### Module structure (each business module follows this layout)

```
modules/<name>/
├── <name>.module.ts
├── <name>.controller.ts
├── dtos/request/   ← class-validator DTOs
├── dtos/response/  ← plain TS classes (ApiProperty for Swagger)
├── exceptions/     ← extend DomainException, use DomainErrorCode
├── features/       ← one @Injectable() class per operation, execute() method
└── utils/<name>.util.ts   ← ensureXById(prisma, id) pure functions (not providers)
```

### Key patterns

**Feature class** — the only place business logic lives:
```typescript
@Injectable()
export class ActivateCustomerFeature {
  constructor(private readonly prisma: PrismaService) {}
  async execute(id: string): Promise<void> {
    const customer = await ensureCustomerById(this.prisma, id);
    if (customer.status === 'ACTIVE') throw new CustomerAlreadyActiveException();
    await this.prisma.customer.update({ where: { id }, data: { status: 'ACTIVE', updatedAt: new Date() } });
  }
}
```

**`utils/` — lookup-or-throw helpers** (plain async functions, not providers):
```typescript
export async function ensureCustomerById(prisma: PrismaService, id: string) {
  const customer = await prisma.customer.findUnique({ where: { id } });
  if (!customer) throw new CustomerNotFoundException();
  return customer;
}
```
Cross-module usage is fine (e.g., `CreateSaleFeature` imports `ensureCustomerById` from `modules/customers/utils/`).

**Exceptions** always extend `DomainException` with a `DomainErrorCode`. `DomainExceptionFilter` maps each code to an HTTP status. Adding a new business error requires: a new enum value → a new exception class → an entry in the filter's `errorCodeToHttpStatus` map.

**`import type` requirement** — interfaces used in decorated parameter signatures must use `import type`:
```typescript
import type { AuthCurrentUser } from '../../common/interfaces/auth-current-user.interface';
// required when isolatedModules + emitDecoratorMetadata are both true
```

**`@UseAuth(...roles)`** — composite decorator that applies `JwtAccessTokenGuard` + `RolesGuard` + `@UseRole`. Use on controller class or individual handler.

**Decimal fields** — Prisma `Decimal` (Sale: `kilograms`, `pricePerKilogram`, `totalAmount`) must call `.toNumber()` when building response DTOs.

**Status strings** — `User.status` / `Customer.status`: `'ACTIVE'` | `'INACTIVE'`. `Sale.paymentStatus`: `'PENDIENTE'` | `'PAGADO'`.

**IDs** — all entities use `randomUUID()` from `'crypto'` at creation time (string UUID, not auto-generated by DB).

**JWT payload**: `{ sub: userId, email, role }`. Strategies return `AuthCurrentUser` plain object `{ id, email, role }` (no value object wrappers).

### Prisma / DB

- Driver: `@prisma/adapter-pg` (pg Pool adapter, not the default Node.js driver)
- `PrismaService` connects via `database.url` from `ConfigService`; lifecycle hooks handle `$connect`/`$disconnect`
- Schema models: `User`, `Customer`, `Sale` — all use string UUIDs as PK, snake_case column names mapped to camelCase fields

### Global NestJS configuration (main.ts)

- Global prefix: `api/v1`
- `ValidationPipe`: whitelist, forbidNonWhitelisted, transform, enableImplicitConversion
- `DomainExceptionFilter` applied globally
- Swagger at `api/docs`
