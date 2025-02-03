import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { PaymentMethod } from './paymentMethod.entity';
import { Order } from './order/order.entity';

@Entity('Purchase')
export class Purchase {
  @PrimaryGeneratedColumn()
  PurchaseID: number;

  @Column()
  OrderID: number;

  @Column()
  PaymentMethodID: number;

  @Column({ length: 50 })
  PaymentStatus: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  PaymentDate: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  Amount: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  CreatedAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  UpdatedAt: Date;

  @ManyToOne(() => Order, (order) => order.purchases, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'OrderID' })
  order: Order;

  @ManyToOne(() => PaymentMethod, (paymentMethod) => paymentMethod.purchases, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'PaymentMethodID' })
  paymentMethod: PaymentMethod;
}
