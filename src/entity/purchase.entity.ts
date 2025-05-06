import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Index,
} from 'typeorm';
import { Vendor } from './vendor.entity';
import { PurchaseOrderItem } from './purchase-order-item.entity';

export enum PurchaseStatus {
  PENDING = 'PENDING',
  DELIVERY = 'DELIVERY',
  COMPLETED = 'COMPLETED',
  CANCLED = 'CANCLED',
  RETURN = 'RETURN',
  RETURNED = 'RETURNED',
}

@Entity('tbl_purchase')
export class Purchase {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'lot_code', length: 100, nullable: true })
  lotCode: string;

  @Column({ name: 'item_type', length: 100, nullable: true })
  itemType: string;

  @Column({ name: 'vendor_id' })
  @Index('fk_po_vendor')
  vendorId: number;

  @ManyToOne(() => Vendor)
  @JoinColumn({ name: 'vendor_id', foreignKeyConstraintName: 'fk_po_vendor' })
  vendor: Vendor;

  @Column({ name: 'payment_method', length: 50, nullable: true })
  paymentMethod: string;

  @Column({ name: 'order_date', type: 'date', nullable: true })
  orderDate: Date;

  @Column({ name: 'order_time', type: 'time', nullable: true })
  orderTime: string;

  @Column({ length: 50, default: 'COMPLETED' })
  status: PurchaseStatus;

  @Column({ type: 'text', nullable: true })
  note: string;

  @OneToMany(() => PurchaseOrderItem, (item) => item.purchase)
  purchaseOrderItems: PurchaseOrderItem[];
}
