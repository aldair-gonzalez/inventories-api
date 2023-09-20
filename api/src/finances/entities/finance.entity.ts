import { Transactions } from 'src/transactions/entities/transaction.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('finances')
export class Finances {
  @PrimaryGeneratedColumn()
  finance_id: number;

  @Column()
  date: Date;

  @Column({
    type: 'decimal',
  })
  amount: number;

  @Column()
  description: string;

  @ManyToOne(() => Transactions)
  @JoinColumn({ name: 'transaction' })
  transaction: number;
}
