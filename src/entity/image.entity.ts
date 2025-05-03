import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ProductDetail } from './product-detail.entity';

@Entity('tbl_images')
export class Image {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'product_detail_id' })
  productDetailId: number;

  @Column({ name: 'image_url', length: 255 })
  imageUrl: string;

  @Column({ name: 'is_thumbnail', default: false })
  isThumbnail: boolean;

  @Column({ name: 'sort_order', default: 0 })
  sortOrder: number;

  @Column({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @ManyToOne(() => ProductDetail, (productDetail) => productDetail.images, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'product_detail_id' })
  productDetail: ProductDetail;
}
