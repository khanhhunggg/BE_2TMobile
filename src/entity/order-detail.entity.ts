import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Order } from './order.entity';
import { ProductDetail } from './product-detail.entity';
import { Cart } from './cart.entity';
import { CartDetail } from './cart-detail.entity';

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

  @Column({ type: 'decimal', precision: 15, scale: 2 })
  total_price: number;
}
