import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Food } from './food.entity';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  cartId: number;

  @ManyToOne(() => User, (user) => user.UserID, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'UserID' })
  user: User;

  @ManyToOne(() => Food, (food) => food.foodID, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'FoodID' })
  food: Food;

  @Column({ type: 'int', default: 1 })
  quantity: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
