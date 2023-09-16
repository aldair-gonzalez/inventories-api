import { Categories } from 'src/categories/entities/category.entity';
import { Vendors } from 'src/vendors/entities/vendor.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('products')
export class Products {
  @PrimaryGeneratedColumn()
  product_id: number;

  @Column({ unique: true })
  product_code: number;

  @Column({ unique: true })
  name: string;

  @Column()
  description: string;

  @Column()
  unit_measure: string;

  @Column()
  quantity: number;

  @Column()
  stock_min: number;

  @Column()
  stock_max: number;

  @Column()
  sale_price: number;

  @Column()
  demand: number;

  @Column()
  initial_quantity: number;

  @Column()
  final_quantity: number;

  @ManyToOne(() => Categories)
  @JoinColumn({ name: 'category' })
  category: number;

  @ManyToOne(() => Vendors)
  @JoinColumn({ name: 'vendor' })
  vendor: number;
}
