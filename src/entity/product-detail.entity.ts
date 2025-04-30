import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Product } from './product.entity';
import { Capacity } from './capacity.entity';
import { Color } from './color.entity';

@Entity('tbl_product_details')
export class ProductDetail {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  product_id: number;

  @Column({ nullable: true })
  color_id: number;

  @Column({ nullable: true })
  capacity_id: number;

  @Column({ default: 0 })
  stock_quantity: number;

  @Column({ length: 100, nullable: true })
  serial_number: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Product, (product) => product.productDetails)
  product: Product;

  @ManyToOne(() => Color, { onDelete: 'SET NULL' })
  color: Color;

  @ManyToOne(() => Capacity, { onDelete: 'SET NULL' })
  capacity: Capacity;
}
