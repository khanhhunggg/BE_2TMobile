import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Check,
} from 'typeorm';
import { CartDetail } from './cart-detail.entity';
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

  @ManyToOne(() => CartDetail, { nullable: true })
  @JoinColumn({ name: 'cart_detail_id' })
  cartDetail?: CartDetail;

  @Column({ type: 'int' })
  quantity: number;

  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
  price: number;

  @Column({ name: 'userName', type: 'varchar', length: 255, nullable: true })
  userName: string;

  @Column({ name: 'userPhone', type: 'varchar', length: 255, nullable: true })
  userPhone: string;

  @Column({
    name: 'userLocation',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  userLocation: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  note: string;
}
