import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

// Config
import configuration from './config/configuration';

// Modules
import { CategoriesModule } from './categories/categories.module';
import { VendorsModule } from './vendors/vendors.module';
import { ProductsModule } from './products/products.module';

// Entities
import { Categories } from './categories/entities/category.entity';
import { Vendors } from './vendors/entities/vendor.entity';
import { Products } from './products/entities/product.entity';

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
        entities: [Categories, Vendors, Products],
      }),
      inject: [ConfigService],
    }),
    CategoriesModule,
    VendorsModule,
    ProductsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
