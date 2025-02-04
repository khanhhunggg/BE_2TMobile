import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CartFood } from '../cart/cartItem.entity';
import { OrderDetail } from '../order/orderDetail.entity';
import { Category } from './category.entity';
import { FoodImage } from './foodImage.entity';
import { Price } from './price.entity';

@Entity('Food')
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

  @ManyToOne(() => Category)
  @JoinColumn({ name: 'categoryID' })
  category: Category;

  @ManyToOne(() => Price)
  @JoinColumn({ name: 'priceID' })
  price: Price;

  @OneToMany(() => FoodImage, (foodImage) => foodImage.food)
  images: FoodImage[];

  @OneToMany(() => CartFood, (cartFood) => cartFood.food)
  cartFoods: CartFood[];

  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.food)
  orderDetails: OrderDetail[];
}
