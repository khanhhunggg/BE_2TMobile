import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Food } from './food.entity';
import { User } from './user.entity';
import { CartFood } from './cart/cartItem.entity';
@Entity('Cart')
export class Cart {
  @PrimaryGeneratedColumn()
  CartID: number;

  @Column()
  UserID: number;

  @Column()
  FoodID: number;

  @Column({ default: 1 })
  TotalQuantity: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  CreatedAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  UpdatedAt: Date;

  @ManyToOne(() => User, (user) => user.carts, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'UserID' })
  user: User;

  @ManyToOne(() => Food, (food) => food.carts, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'FoodID' })
  food: Food;

  @OneToMany(() => CartFood, (cartFood) => cartFood.cart)
  cartFoods: CartFood[];
}
