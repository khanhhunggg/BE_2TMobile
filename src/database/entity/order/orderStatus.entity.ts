import { Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Column } from 'typeorm';
import { Order } from './order.entity';

@Entity('OrderStatus')
export class OrderStatus {
  @PrimaryGeneratedColumn()
  StatusID: number;

  @Column({ length: 50 })
  StatusName: string;

  @OneToMany(() => Order, (order) => order.orderStatus)
  orders: Order[];
}
