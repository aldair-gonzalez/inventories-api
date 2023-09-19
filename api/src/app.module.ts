import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

// Config
import configuration from './config/configuration';

// Modules
import { CategoriesModule } from './categories/categories.module';
import { SuppliersModule } from './suppliers/suppliers.module';
import { ProductsModule } from './products/products.module';
import { TransactionsModule } from './transactions/transactions.module';
import { FinancesModule } from './finances/finances.module';
import { OrderStatusesModule } from './order-statuses/order-statuses.module';
import { PurchaseOrdersModule } from './purchase-orders/purchase-orders.module';

// Entities
import { Categories } from './categories/entities/category.entity';
import { Suppliers } from './suppliers/entities/supplier.entity';
import { Products } from './products/entities/product.entity';
import { Transactions } from './transactions/entities/transaction.entity';
import { Finances } from './finances/entities/finance.entity';
import { OrderStatuses } from './order-statuses/entities/order-status.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [
        '.env.development.local',
        '.env.test.local',
        '.env.production.local',
        '.env.development',
        '.env.test',
        '.env.production',
      ],
      isGlobal: true,
      cache: true,
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('database.host'),
        port: configService.get<number>('database.port'),
        username: configService.get<string>('database.username'),
        password: configService.get<string>('database.password'),
        database: configService.get<string>('database.name'),
        entities: [
          Categories,
          Suppliers,
          Products,
          Transactions,
          Finances,
          OrderStatuses,
        ],
      }),
      inject: [ConfigService],
    }),
    CategoriesModule,
    SuppliersModule,
    ProductsModule,
    TransactionsModule,
    FinancesModule,
    OrderStatusesModule,
    PurchaseOrdersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
