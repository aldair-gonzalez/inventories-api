import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesModule } from './categories/categories.module';
import { Categories } from './categories/entities/category.entity';
import { VendorsModule } from './vendors/vendors.module';
import { Vendors } from './vendors/entities/vendor.entity';
import { ProductsModule } from './products/products.module';
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
