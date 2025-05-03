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

  @ManyToOne(() => ProductDetail, (productDetail) => productDetail.images)
  @JoinColumn({ name: 'product_detail_id' })
  productDetail: ProductDetail;
}
