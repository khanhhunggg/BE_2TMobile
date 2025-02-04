import { Entity } from 'typeorm';

import { Column, PrimaryGeneratedColumn } from 'typeorm';

import { JoinColumn, ManyToOne } from 'typeorm';
import { Cart } from '../cart/cart.entity';
import { Order } from './order.entity';

@Entity('OrderCart')
export class OrderCart {
  @PrimaryGeneratedColumn()
  OrderCartID: number;

  @Column()
  OrderID: number;

  @Column()
  CartID: number;

  @ManyToOne(() => Order, (order) => order.cart)
  @JoinColumn({ name: 'OrderID' })
  order: Order;

  @ManyToOne(() => Cart, (cart) => cart.orders)
  @JoinColumn({ name: 'CartID' })
  cart: Cart;
}
