import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('transactions')
export class Transactions {
  @PrimaryGeneratedColumn()
  transaction_id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  description: string;
}
