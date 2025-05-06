import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Capacity } from './capacity.entity';
import { Color } from './color.entity';
import { Product } from './product.entity';
import { Review } from './review.entity';

@Entity('tbl_product_details')
export class ProductDetail {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  product_id: number;

  @Column()
  capacity_id: number;

  @Column({ default: 0 })
  stock_quantity: number;

  @Column({ length: 100, nullable: true })
  serial_number: string;

  @Column({ length: 55, nullable: true })
  import_price: string;

  @Column({ length: 55, nullable: true })
  selling_price: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Product, (product) => product.productDetails, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @ManyToOne(() => Capacity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'capacity_id' })
  capacity: Capacity;

  @Column({ nullable: true })
  color_id: number;

  @ManyToOne(() => Color, (color) => color.productDetails, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'color_id' })
  color: Color;

  @OneToMany(() => Review, (review) => review.productDetail)
  reviews: Review[];
}
