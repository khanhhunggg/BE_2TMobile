import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Cart } from './cart.entity';
import { Food } from '../food/food.entity';

@Entity('CartFood')
export class CartFood {
  @PrimaryGeneratedColumn()
  CartFoodID: number;

  @Column()
  CartID: number;

  @Column()
  FoodID: number;

  @Column({ default: 1 })
  Quantity: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  CreatedAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  UpdatedAt: Date;

  @ManyToOne(() => Cart, (cart) => cart.cartFoods, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'CartID' })
  cart: Cart;

  @ManyToOne(() => Food, (food) => food.cartFoods, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'FoodID' })
  food: Food;
}
