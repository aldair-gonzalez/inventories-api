import { Lots } from 'src/lots/entities/lot.entity';
import { Products } from 'src/products/entities/product.entity';
import { PurchaseOrders } from 'src/purchase-orders/entities/purchase-order.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('inventories')
export class Inventories {
  @PrimaryGeneratedColumn()
  inventory_id: number;

  @Column({
    type: 'decimal',
  })
  quantity: number;

  @Column({
    type: 'decimal',
  })
  unit_cost: number;

  @Column()
  purchase_date: Date;

  @Column()
  expiration_date: Date;

  @ManyToOne(() => Products)
  @JoinColumn({ name: 'product' })
  product: number;

  @ManyToOne(() => PurchaseOrders)
  @JoinColumn({ name: 'purchase_order' })
  purchase_order: number;

  @ManyToOne(() => Lots)
  @JoinColumn({ name: 'lot' })
  lot: number;
}
