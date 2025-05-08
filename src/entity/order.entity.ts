import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { User } from './user.entity';
import { OrderDetail } from './order-detail.entity';

export enum PaymentMethod {
  BANKING = 'BANKING',
  CAST = 'CAST',
}

export enum OrderStatus {
  PENDING = 'PENDING',
  DELIVERY = 'DELIVERY',
  COMPLETED = 'COMPLETED',
  CANCLED = 'CANCLED',
  RETURN = 'RETURN',
  RETURNED = 'RETURNED',
}

@Entity('tbl_order')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

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

  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
  total_price: number;

  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.order)
  orderDetails: OrderDetail[];
}
