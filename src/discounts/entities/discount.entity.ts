import { Products } from 'src/products/entities/product.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('discounts')
export class Discounts {
  @PrimaryGeneratedColumn()
  discount_id: number;

  @Column()
  discount_type: string;

  @Column({
    type: 'decimal',
  })
  discount_amount: number;

  @Column()
  discount_start_date: Date;

  @Column()
  discount_end_date: Date;

  @ManyToOne(() => Products)
  @JoinColumn({ name: 'product' })
  product: number;
}
