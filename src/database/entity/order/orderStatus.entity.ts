import { Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Column } from 'typeorm';
import { Order } from './order.entity';

@Entity('OrderStatus')
export class OrderStatus {
  @PrimaryGeneratedColumn()
  StatusID: number;

  @Column({ length: 50 })
  StatusName: string;

  @Column('text')
  Description: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  CreatedAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  UpdatedAt: Date;

  @OneToMany(() => Order, (order) => order.orderStatus)
  orders: Order[];
}
