import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
} from 'typeorm';
import { CapacityPrice } from './capacity-price.entity';

export enum CapacityUnit {
  MB = 'MB',
  GB = 'GB',
  TB = 'TB',
}

@Entity('tbl_capacities')
export class Capacity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  value: number;

  @Column({
    type: 'enum',
    enum: CapacityUnit,
    default: CapacityUnit.GB,
  })
  unit: CapacityUnit;

  @Column({ length: 50, nullable: true })
  display_name: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToOne(() => CapacityPrice, (price) => price.capacity)
  price: CapacityPrice;
}
