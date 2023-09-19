import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('order_statuses')
export class OrderStatuses {
  @PrimaryGeneratedColumn()
  order_status_id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  description: string;
}
