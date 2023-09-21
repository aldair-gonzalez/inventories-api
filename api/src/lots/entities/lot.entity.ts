import { PurchaseOrders } from 'src/purchase-orders/entities/purchase-order.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('lots')
export class Lots {
  @PrimaryGeneratedColumn()
  lot_id: number;

  @Column()
  lot_number: string;

  @ManyToOne(() => PurchaseOrders)
  @JoinColumn({ name: 'purchase_order' })
  purchase_order: number;
}
