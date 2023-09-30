import { Products } from 'src/products/entities/product.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('sales_details')
export class SalesDetails {
  @PrimaryGeneratedColumn()
  sale_id: number;

  @Column({
    type: 'decimal',
  })
  quantity: number;

  @Column({
    type: 'decimal',
  })
  price: number;

  @ManyToOne(() => Products)
  @JoinColumn({ name: 'product' })
  product: number;
}
