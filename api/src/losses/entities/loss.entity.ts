import { LossesType } from 'src/losses-type/entities/losses-type.entity';
import { Products } from 'src/products/entities/product.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('losses')
export class Losses {
  @PrimaryGeneratedColumn()
  loss_id: number;

  @Column()
  date: Date;

  @Column()
  description: string;

  @Column({
    type: 'decimal',
  })
  quantity: number;

  @Column({
    type: 'decimal',
  })
  amount: number;

  @ManyToOne(() => Products)
  @JoinColumn({ name: 'product' })
  product: number;

  @ManyToOne(() => LossesType)
  @JoinColumn({ name: 'loss_type' })
  loss_type: number;
}
