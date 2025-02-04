import { IsOptional } from 'class-validator';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Cart } from '../cart/cart.entity';
import { PaymentMethod } from '../paymentMethod.entity';
import { Purchase } from '../purchase.entity';
import { ShippingMethod } from '../shippingMethod.entity';
import { User } from '../user.entity';
import { OrderDetail } from './orderDetail.entity';
import { OrderStatus } from './orderStatus.entity';
@Entity('Order')
export class Order {
  @PrimaryGeneratedColumn()
  @IsOptional()
  OrderID: number;

  @Column()
  UserID: number;

  @Column('decimal', { precision: 10, scale: 2 })
  TotalPrice: number;

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  OrderDate: Date;

  @Column()
  StatusID: number;

  @Column()
  PaymentMethodID: number;

  @Column()
  DeliveryAddress: string;

  @Column('text', { nullable: true })
  Note: string;

  @ManyToOne(() => User, (user) => user.orders)
  @JoinColumn({ name: 'UserID' })
  user: User;

  @ManyToOne(() => OrderStatus, (orderStatus) => orderStatus.orders)
  @JoinColumn({ name: 'StatusID' })
  orderStatus: OrderStatus;

  @ManyToOne(() => PaymentMethod, (paymentMethod) => paymentMethod.orders)
  @JoinColumn({ name: 'PaymentMethodID' })
  paymentMethod: PaymentMethod;

  @ManyToOne(() => Cart, (cart) => cart.orders)
  @JoinColumn({ name: 'CartID' })
  cart: Cart;

  @OneToMany(() => Purchase, (purchase) => purchase.order)
  purchases: Purchase[];

  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.order)
  orderDetails: OrderDetail[];

  @ManyToOne(() => ShippingMethod, (shippingMethod) => shippingMethod.orders)
  @JoinColumn({ name: 'ShippingID' })
  shippingMethod: ShippingMethod;
}
