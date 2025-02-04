import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from './order/order.entity';

@Entity('ShippingMethods')
export class ShippingMethod {
  @PrimaryGeneratedColumn()
  ShippingID: number;

  @Column({ type: 'varchar', length: 50, unique: true })
  Name: string;

  @Column({ type: 'text', nullable: true })
  Description: string | null;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  Price: number;

  @Column({ type: 'varchar', length: 50 })
  EstimatedTime: string;

  @Column({ type: 'boolean', default: true })
  IsActive: boolean;

  @OneToMany(() => Order, (order) => order.shippingMethod)
  orders: Order[];
}
