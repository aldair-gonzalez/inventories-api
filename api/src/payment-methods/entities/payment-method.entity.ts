import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('payment_methods')
export class PaymentMethods {
  @PrimaryGeneratedColumn()
  payment_method_id: number;

  @Column({
    unique: true,
  })
  name: string;

  @Column()
  description: string;
}
