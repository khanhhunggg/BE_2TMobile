import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ProductDetail } from './product-detail.entity';
import { Product } from './product.entity';

@Entity('tbl_images')
export class Image {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  productDetailId: number;

  @Column()
  imageUrl: string;

  @Column({ default: true })
  isThumbnail: boolean;

  @Column({ default: 0 })
  sortOrder: number;

  @ManyToOne(() => Product, (product) => product.images)
  @JoinColumn({ name: 'product_id' })
  product: Product;
}
