import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from './order/order.entity';
import { Purchase } from './purchase.entity';

@Entity('PaymentMethods')
export class PaymentMethod {
  @PrimaryGeneratedColumn()
  PaymentMethodID: number;

  @Column({ length: 100 })
  PaymentMethodName: string;

  @Column({ type: 'text', nullable: true })
  Description: string | null;

  @OneToMany(() => Order, (order) => order.paymentMethod)
  orders: Order[];

  @OneToMany(() => Purchase, (purchase) => purchase.paymentMethod)
  purchases: Purchase[];
}
