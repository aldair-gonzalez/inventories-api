import { Categories } from 'src/categories/entities/category.entity';
import { Suppliers } from 'src/suppliers/entities/supplier.entity';
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

  @Column({
    type: 'decimal',
  })
  quantity: number;

  @Column({
    type: 'decimal',
  })
  stock_min: number;

  @Column({
    type: 'decimal',
  })
  stock_max: number;

  @Column({
    type: 'decimal',
  })
  sale_price: number;

  @Column({
    type: 'decimal',
  })
  demand: number;

  @Column({
    type: 'decimal',
  })
  initial_quantity: number;

  @Column({
    type: 'decimal',
  })
  final_quantity: number;

  @ManyToOne(() => Categories)
  @JoinColumn({ name: 'category' })
  category: number;

  @ManyToOne(() => Suppliers)
  @JoinColumn({ name: 'supplier' })
  supplier: number;
}
