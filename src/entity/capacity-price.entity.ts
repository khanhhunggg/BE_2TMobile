import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Capacity } from './capacity.entity';

@Entity('tbl_capacity_prices')
export class CapacityPrice {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  capacity_id: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  discount_price: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Capacity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'capacity_id' })
  capacity: Capacity;
}
