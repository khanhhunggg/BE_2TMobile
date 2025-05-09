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
  RETURNING = 'RETURNING',
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

  @Column({ type: 'int', default: 0 })
  total_price: number;

  @Column({ type: 'text', nullable: true })
  note: string;

  @Column({
    name: 'userLocation',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  userLocation: string;

  @Column({ name: 'userPhone', type: 'varchar', length: 20, nullable: true })
  userPhone: string;

  @Column({ name: 'userName', type: 'varchar', length: 100, nullable: true })
  userName: string;

  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.order)
  orderDetails: OrderDetail[];
}
