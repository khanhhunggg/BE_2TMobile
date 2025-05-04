import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { ProductDetail } from './product-detail.entity';

@Entity('tbl_colors')
export class Color {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  name: string;

  @Column({ length: 20, nullable: true })
  color_code: string;

  @OneToMany(() => ProductDetail, (productDetail) => productDetail.color)
  productDetails: ProductDetail[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
