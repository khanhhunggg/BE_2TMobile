import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { User } from './user.entity';
import { Product } from './product.entity';

@Entity('vendor')
export class Vendor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'vendor_code', length: 50, unique: true })
  vendorCode: string;

  @Column({ length: 255 })
  name: string;

  @Column({ length: 20, nullable: true })
  phone: string;

  @Column({ length: 100, nullable: true })
  email: string;

  @Column({ type: 'text', nullable: true })
  address: string;

  @Column({ name: 'contact_person', nullable: true })
  contactPersonId: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'contact_person' })
  contactPerson: User;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => Product, (product) => product.vendor)
  products: Product[];
}
