import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Provider } from './provider.entity';
import { ProductDetail } from './product-detail.entity';
import { Specs } from './specs.entity';

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

  @Column({ length: 50, nullable: true })
  original_price: string;

  @Column({
    type: 'enum',
    enum: ['Active', 'Inactive'],
    default: 'Active',
  })
  status: 'Active' | 'Inactive';

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ nullable: true })
  provider_id: number;

  @ManyToOne(() => Provider, (provider) => provider.products)
  provider: Provider;

  @OneToMany(() => ProductDetail, (productDetail) => productDetail.product)
  productDetails: ProductDetail[];

  @OneToMany(() => Specs, (specs) => specs.product)
  specs: Specs[];
}
