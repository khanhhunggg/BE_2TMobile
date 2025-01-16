import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Price } from './price.entity';
import { Category } from './category.entity';

@Entity()
export class Food {
  @PrimaryGeneratedColumn()
  foodID: number;

  @Column({ length: 100, nullable: false })
  name: string;

  @Column('text')
  description: string;

  @Column()
  categoryID: number;

  @Column()
  priceID: number;

  @Column({ default: 0 })
  stock: number;

  @Column({ default: true })
  isAvailable: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Category)
  @JoinColumn({ name: 'categoryID' })
  category: Category;

  @ManyToOne(() => Price)
  @JoinColumn({ name: 'priceID' })
  price: Price;
}
