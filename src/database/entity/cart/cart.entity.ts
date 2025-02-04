import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Order } from '../order/order.entity';
import { User } from '../user.entity';
import { CartFood } from './cartItem.entity';

@Entity('Cart')
export class Cart {
  @PrimaryGeneratedColumn()
  CartID: number;

  @Column()
  UserID: number;

  @Column({ default: 1 })
  TotalQuantity: number;

  @ManyToOne(() => User, (user) => user.carts, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'UserID' })
  user: User;

  @OneToMany(() => CartFood, (cartFood) => cartFood.cart)
  cartFoods: CartFood[];

  @OneToMany(() => Order, (order) => order.cart)
  orders: Order[];
}
