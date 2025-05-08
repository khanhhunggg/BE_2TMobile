import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CartDetail } from './cart-detail.entity';
import { Order } from './order.entity';
import { ProductDetail } from './product-detail.entity';

@Entity('tbl_order_details')
export class OrderDetail {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Order, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @ManyToOne(() => ProductDetail)
  @JoinColumn({ name: 'product_detail_id' })
  productDetail: ProductDetail;

  @ManyToOne(() => CartDetail, { nullable: true })
  @JoinColumn({ name: 'cart_detail_id' })
  cartDetail?: CartDetail;

  @Column({ type: 'int' })
  quantity: number;

  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
  price: number;
}
