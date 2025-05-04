import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Discount } from './discount.entity';
import { User } from './user.entity';

@Entity('tbl_discount_users')
export class DiscountUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'discount_id', type: 'bigint' })
  discountId: number;

  @Column({ name: 'user_id', type: 'int' })
  userId: number;

  @CreateDateColumn({ name: 'assigned_at' })
  assignedAt: Date;

  @ManyToOne(() => Discount)
  @JoinColumn({ name: 'discount_id' })
  discount: Discount;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
