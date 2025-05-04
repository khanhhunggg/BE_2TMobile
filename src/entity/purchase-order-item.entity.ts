import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { Purchase } from './purchase.entity';
import { ProductDetail } from './product-detail.entity';
import { Product } from './product.entity';

@Entity('tbl_purchase_order_item')
export class PurchaseOrderItem {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ name: 'purchase_order_id', type: 'bigint' })
  @Index('fk_po_item_order')
  purchaseOrderId: number;

  @Column({
    name: 'product_id',
    type: 'int',
    nullable: true,
  })
  @Index('fk_po_item_product')
  productId: number;

  @Column({ type: 'int' })
  quantity: number;

  @Column({
    name: 'unit_price',
    type: 'decimal',
    precision: 12,
    scale: 2,
    nullable: true,
  })
  unitPrice: number;

  @Column({
    name: 'total_price',
    type: 'decimal',
    precision: 14,
    scale: 2,
    nullable: true,
  })
  totalPrice: number;

  @ManyToOne(() => Purchase, (purchase) => purchase.items)
  @JoinColumn({
    name: 'purchase_order_id',
    foreignKeyConstraintName: 'fk_po_item_order',
  })
  purchase: Purchase;

  @ManyToOne(() => ProductDetail)
  @JoinColumn({
    name: 'product_id',
    foreignKeyConstraintName: 'fk_po_item_product',
  })
  product: Product;
}
