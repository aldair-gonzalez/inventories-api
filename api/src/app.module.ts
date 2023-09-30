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
import { PurchaseOrderDetailsModule } from './purchase-order-details/purchase-order-details.module';
import { LotsModule } from './lots/lots.module';
import { InventoriesModule } from './inventories/inventories.module';
import { DiscountsModule } from './discounts/discounts.module';
import { PaymentMethodsModule } from './payment-methods/payment-methods.module';
import { SalesModule } from './sales/sales.module';
import { SalesDetailsModule } from './sales-details/sales-details.module';
import { LossesTypeModule } from './losses-type/losses-type.module';
import { LossesModule } from './losses/losses.module';

// Entities
import { Categories } from './categories/entities/category.entity';
import { Suppliers } from './suppliers/entities/supplier.entity';
import { Products } from './products/entities/product.entity';
import { Transactions } from './transactions/entities/transaction.entity';
import { Finances } from './finances/entities/finance.entity';
import { OrderStatuses } from './order-statuses/entities/order-status.entity';
import { PurchaseOrders } from './purchase-orders/entities/purchase-order.entity';
import { PurchaseOrderDetails } from './purchase-order-details/entities/purchase-order-detail.entity';
import { Lots } from './lots/entities/lot.entity';
import { Inventories } from './inventories/entities/inventory.entity';
import { Discounts } from './discounts/entities/discount.entity';
import { PaymentMethods } from './payment-methods/entities/payment-method.entity';
import { Sales } from './sales/entities/sale.entity';
import { SalesDetails } from './sales-details/entities/sales-detail.entity';
import { LossesType } from './losses-type/entities/losses-type.entity';
import { Losses } from './losses/entities/loss.entity';

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
          PurchaseOrders,
          PurchaseOrderDetails,
          Lots,
          Inventories,
          Discounts,
          PaymentMethods,
          Sales,
          SalesDetails,
          LossesType,
          Losses,
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
    PurchaseOrderDetailsModule,
    LotsModule,
    InventoriesModule,
    DiscountsModule,
    PaymentMethodsModule,
    SalesModule,
    SalesDetailsModule,
    LossesTypeModule,
    LossesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
