import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Cart } from './cart.entity';
import { ProductDetail } from './product-detail.entity';

@Entity('tbl_cart_details')
export class CartDetail {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cart_id: number;

  @Column()
  product_detail_id: number;

  @Column()
  quantity: number;

  @Column({ nullable: true })
  price: string;

  @ManyToOne(() => Cart, (cart) => cart.cartDetails)
  cart: Cart;

  @ManyToOne(() => ProductDetail)
  productDetail: ProductDetail;

  @CreateDateColumn()
  created_at: Date;
}
