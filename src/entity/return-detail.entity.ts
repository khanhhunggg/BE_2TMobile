import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Return } from './return.entity';

export enum ReturnStatus {
  PENDING = 'Pending',
  APPROVED = 'Approved',
  REJECTED = 'Rejected',
  SHIPPING = 'Shipping',
  COMPLETED = 'Completed',
}

@Entity('tbl_return_details')
export class ReturnDetail {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'return_id' })
  returnId: number;

  @Column({
    type: 'enum',
    enum: ReturnStatus,
    default: ReturnStatus.PENDING,
  })
  status: ReturnStatus;

  @Column({ name: 'shipping_code', length: 50, nullable: true })
  shippingCode: string;

  @Column({ name: 'custom_reason', type: 'text', nullable: true })
  customReason: string;

  @Column({ type: 'json', nullable: true })
  images: string[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => Return, (returnEntity) => returnEntity.returnDetails, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'return_id' })
  return: Return;
}
