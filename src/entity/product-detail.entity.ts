import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Product } from './product.entity';
import { Capacity } from './capacity.entity';
import { Color } from './color.entity';
import { Image } from './image.entity';

@Entity('tbl_product_details')
export class ProductDetail {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  product_id: number;

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
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @ManyToOne(() => Capacity, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'capacity_id' })
  capacity: Capacity;

  @OneToMany(() => Image, (image) => image.productDetail)
  images: Image[];

  @Column({ nullable: true })
  color_id: number;

  @ManyToOne(() => Color, (color) => color.productDetails)
  @JoinColumn({ name: 'color_id' })
  color: Color;
}
