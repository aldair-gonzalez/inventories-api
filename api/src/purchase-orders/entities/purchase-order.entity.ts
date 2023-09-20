import { OrderStatuses } from 'src/order-statuses/entities/order-status.entity';
import { Suppliers } from 'src/suppliers/entities/supplier.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('purchase_orders')
export class PurchaseOrders {
  @PrimaryGeneratedColumn()
  purchase_order_id: number;

  @Column()
  date: Date;

  @Column()
  delivery_date: Date;

  @Column({
    type: 'decimal',
  })
  total_amount: number;

  @ManyToOne(() => Suppliers)
  @JoinColumn({ name: 'supplier' })
  supplier: number;

  @ManyToOne(() => OrderStatuses)
  @JoinColumn({ name: 'order_status' })
  order_status: number;
}
