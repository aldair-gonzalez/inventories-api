import { PaymentMethods } from 'src/payment-methods/entities/payment-method.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('sales')
export class Sales {
  @PrimaryGeneratedColumn()
  sale_id: number;

  @Column()
  date: Date;

  @Column({
    type: 'decimal',
  })
  total_amount: number;

  @ManyToOne(() => PaymentMethods)
  @JoinColumn({ name: 'payment_method' })
  payment_method: number;
}
