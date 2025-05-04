import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Image } from './image.entity';
import { ProductDetail } from './product-detail.entity';
import { Specs } from './specs.entity';
import { Vendor } from './vendor.entity';

@Entity('tbl_products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  name: string;

  @Column({ length: 100, nullable: true })
  model: string;

  @Column('text', { nullable: true })
  description: string;

  @Column({ nullable: true })
  warranty_period: number;

  @Column({ nullable: true })
  release_year: number;

  @Column({ default: false })
  is_featured: boolean;

  @Column({
    type: 'enum',
    enum: ['Active', 'Inactive'],
    default: 'Active',
  })
  status: 'Active' | 'Inactive';

  @CreateDateColumn({ default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;

  @Column({ nullable: true })
  vendor_id: number;

  @ManyToOne(() => Vendor, (vendor) => vendor.products)
  vendor: Vendor;

  @OneToMany(() => ProductDetail, (productDetail) => productDetail.product)
  productDetails: ProductDetail[];

  @OneToMany(() => Specs, (specs) => specs.product)
  specs: Specs[];

  @OneToMany(() => Image, (image) => image.product)
  images: Image[];
}
