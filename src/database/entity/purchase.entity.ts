import { BaseEntity } from 'src/common/common.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Order } from './order/order.entity';
import { PaymentMethod } from './paymentMethod.entity';

@Entity('Purchase')
export class Purchase extends BaseEntity {
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

  @ManyToOne(() => Order, (order) => order.purchases, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'OrderID' })
  order: Order;

  @ManyToOne(() => PaymentMethod, (paymentMethod) => paymentMethod.purchases, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'PaymentMethodID' })
  paymentMethod: PaymentMethod;
}
