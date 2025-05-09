import {
  Check,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Order } from './order.entity';
import { ProductDetail } from './product-detail.entity';

@Entity('tbl_order_details')
@Check('order_details_chk_price', 'price >= 0')
@Check('order_details_chk_quantity', 'quantity > 0')
export class OrderDetail {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Order, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @ManyToOne(() => ProductDetail)
  @JoinColumn({ name: 'product_detail_id' })
  productDetail: ProductDetail;

  @Column({ type: 'int' })
  quantity: number;

  @Column({ type: 'int', nullable: true })
  price: number;
}
