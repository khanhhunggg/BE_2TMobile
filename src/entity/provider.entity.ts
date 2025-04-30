import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Product } from './product.entity';

@Entity('tbl_providers')
export class Provider {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  name: string;

  @Column({ length: 255, nullable: true })
  email: string;

  @Column({ length: 20 })
  phone: string;

  @Column('text', { nullable: true })
  address: string;

  @Column({ length: 255, nullable: true })
  logo: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Product, (product) => product.provider)
  products: Product[];
}
