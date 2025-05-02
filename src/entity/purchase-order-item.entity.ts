import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Purchase } from './purchase.entity';
import { Product } from './product.entity';

@Entity('tbl_purchase_order_item')
export class PurchaseOrderItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'purchase_order_id' })
  purchaseOrderId: number;

  @ManyToOne(() => Purchase, (purchase) => purchase.items)
  @JoinColumn({ name: 'purchase_order_id' })
  purchase: Purchase;

  @Column({ name: 'product_id' })
  productId: number;

  @ManyToOne(() => Product)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @Column()
  quantity: number;

  @Column({ name: 'unit_price', type: 'decimal', precision: 12, scale: 2 })
  unitPrice: number;

  @Column({ name: 'total_price', type: 'decimal', precision: 14, scale: 2 })
  totalPrice: number;
}
