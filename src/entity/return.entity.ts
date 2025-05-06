import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { OrderDetail } from './order-detail.entity';
import { PurchaseOrderItem } from './purchase-order-item.entity';
import { ReturnDetail } from './return-detail.entity';

export enum ReturnType {
  REFUND = 'Refund',
  REPAIR = 'Repair',
  REPLACEMENT = 'Replacement',
}

@Entity('tbl_returns')
export class Return {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'order_detail_id' })
  orderDetailId: number;

  @Column({ name: 'purchase_detail_id' })
  purchaseDetailId: number;

  @Column({ name: 'admin_id', nullable: true })
  adminId: number;

  @Column({ name: 'customer_id' })
  customerId: number;

  @Column({ name: 'return_code', length: 20, nullable: true, unique: true })
  returnCode: string;

  @Column({
    type: 'enum',
    enum: ReturnType,
    default: ReturnType.REFUND,
  })
  type: ReturnType;

  @Column({
    name: 'refund_amount',
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: true,
  })
  refundAmount: number;

  @Column({ name: 'reason_id', nullable: true })
  reasonId: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => OrderDetail)
  @JoinColumn({ name: 'order_detail_id' })
  orderDetail: OrderDetail;

  @ManyToOne(() => PurchaseOrderItem)
  @JoinColumn({ name: 'purchase_detail_id' })
  purchaseDetail: PurchaseOrderItem;

  @OneToMany(() => ReturnDetail, (returnDetail) => returnDetail.return)
  returnDetails: ReturnDetail[];
}
