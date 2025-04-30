import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { ProductDetail } from './product-detail.entity';

@Entity('tbl_capacities')
export class Capacity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  value: number;

  @Column({
    type: 'enum',
    enum: ['MB', 'GB', 'TB'],
    default: 'GB',
  })
  unit: 'MB' | 'GB' | 'TB';

  @Column({ length: 50, nullable: true })
  display_name: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => ProductDetail, (productDetail) => productDetail.capacity)
  productDetails: ProductDetail[];
}
