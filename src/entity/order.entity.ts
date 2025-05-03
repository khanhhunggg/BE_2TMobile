import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Product } from './product.entity';
import { User } from './user.entity';
import { Cart } from './cart.entity';
import { Payment } from './payment.entity';

export enum PaymentMethod {
  BANKING = 'BANKING',
  CAST = 'CAST',
}

export enum OrderStatus {
  PENDING = 'PENDING',
  DELIVERY = 'DELIVERY',
  COMPLETED = 'COMPLETED',
  CANCLED = 'CANCLED',
}

@Entity('tbl_order')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Product)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Cart, { nullable: true })
  @JoinColumn({ name: 'cart_id' })
  cart?: Cart;

  @Column({ type: 'int' })
  quantity: number;

  @Column({ type: 'decimal', precision: 15, scale: 2 })
  total_price: number;

  @Column({ type: 'enum', enum: PaymentMethod })
  payment_method: PaymentMethod;

  @CreateDateColumn({ type: 'datetime' })
  order_date: Date;

  @Column({ type: 'date', nullable: true })
  expected_delivery_date: Date;

  @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.PENDING })
  status: OrderStatus;

  @Column({ type: 'date', nullable: true })
  delivered_date: Date;

  @OneToMany(() => Payment, (payment) => payment.order)
  payments: Payment[];
}
