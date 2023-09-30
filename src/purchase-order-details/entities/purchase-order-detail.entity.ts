import { Products } from 'src/products/entities/product.entity';
import { PurchaseOrders } from 'src/purchase-orders/entities/purchase-order.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('purchase_order_details')
export class PurchaseOrderDetails {
  @PrimaryGeneratedColumn()
  purchase_order_detail_id: number;

  @Column({
    type: 'decimal',
  })
  quantity: number;

  @Column({
    type: 'decimal',
  })
  price: number;

  @ManyToOne(() => Products)
  @JoinColumn({ name: 'product' })
  product: number;

  @ManyToOne(() => PurchaseOrders)
  @JoinColumn({ name: 'purchase_order' })
  purchase_order: number;
}
