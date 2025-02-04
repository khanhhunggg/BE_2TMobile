import { Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { BaseEntity } from 'src/common/common.entity';
import { Column } from 'typeorm';
import { Order } from './order.entity';

@Entity('OrderStatus')
export class OrderStatus extends BaseEntity {
  @PrimaryGeneratedColumn()
  StatusID: number;

  @Column({ length: 50 })
  StatusName: string;

  @Column('text')
  Description: string;

  @OneToMany(() => Order, (order) => order.orderStatus)
  orders: Order[];
}
