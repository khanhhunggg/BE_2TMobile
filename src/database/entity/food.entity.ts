import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Cart } from './cart/cart.entity';
import { Category } from './category.entity';
import { FoodImage } from './foodImage.entity';
import { Price } from './price.entity';

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

  @OneToMany(() => FoodImage, (foodImage) => foodImage.food)
  images: FoodImage[];

  @OneToMany(() => Cart, (cart) => cart.food)
  carts: Cart[];
}
