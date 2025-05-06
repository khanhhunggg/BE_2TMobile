import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Order } from './order.entity';

@Entity('tbl_payment')
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'order_id' })
  orderId: number;

  @Column({ name: 'buyer_name', length: 255, nullable: true })
  buyerName: string;

  @Column({ name: 'buyer_email', length: 255, nullable: true })
  buyerEmail: string;

  @Column({ name: 'buyer_phone', length: 20, nullable: true })
  buyerPhone: string;

  @Column({ name: 'buyer_address', type: 'text', nullable: true })
  buyerAddress: string;

  @Column({ name: 'expired_at', type: 'bigint', nullable: true })
  expiredAt: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => Order)
  @JoinColumn({ name: 'order_id' })
  order: Order;
}
