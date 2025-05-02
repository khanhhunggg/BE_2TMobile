import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Vendor } from './vendor.entity';
import { PurchaseOrderItem } from './purchase-order-item.entity';

@Entity('tbl_purchase')
export class Purchase {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'lot_code', length: 100, nullable: true })
  lotCode: string;

  @Column({ name: 'item_type', length: 100, nullable: true })
  itemType: string;

  @Column({ name: 'vendor_id' })
  vendorId: number;

  @ManyToOne(() => Vendor)
  @JoinColumn({ name: 'vendor_id' })
  vendor: Vendor;

  @Column({ name: 'payment_method', length: 50, nullable: true })
  paymentMethod: string;

  @Column({ name: 'order_date', type: 'date', nullable: true })
  orderDate: Date;

  @Column({ name: 'order_time', type: 'time', nullable: true })
  orderTime: string;

  @Column({ length: 50, default: 'COMPLETED' })
  status: string;

  @Column({ type: 'text', nullable: true })
  note: string;

  @OneToMany(() => PurchaseOrderItem, (item) => item.purchase)
  items: PurchaseOrderItem[];
}
