import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Order } from './order.entity';
import { Food } from '../food/food.entity';

@Entity('OrderDetails')
export class OrderDetail {
  @PrimaryGeneratedColumn()
  OrderDetailID: number;

  @Column()
  OrderID: number;

  @Column()
  FoodID: number;

  @Column()
  Quantity: number;

  @Column('decimal', { precision: 10, scale: 2 })
  UnitPrice: number;

  @Column('decimal', { precision: 10, scale: 2 })
  Total: number;

  @ManyToOne(() => Order, (order) => order.orderDetails)
  @JoinColumn({ name: 'OrderID' })
  order: Order;

  @ManyToOne(() => Food, (food) => food.orderDetails)
  @JoinColumn({ name: 'FoodID' })
  food: Food;
}
