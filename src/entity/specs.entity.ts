import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Product } from './product.entity';

@Entity('tbl_specs')
export class Specs {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  product_id: number;

  @Column({ length: 50, nullable: true })
  screen_size: string;

  @Column({ length: 50, nullable: true })
  resolution: string;

  @Column({ length: 100, nullable: true })
  chipset: string;

  @Column({ length: 20, nullable: true })
  ram: string;

  @Column({ length: 50, nullable: true })
  os: string;

  @Column({ length: 50, nullable: true })
  battery_capacity: string;

  @Column({ length: 100, nullable: true })
  charging_tech: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Product, (product) => product.specs)
  @JoinColumn({ name: 'product_id' })
  product: Product;
}
