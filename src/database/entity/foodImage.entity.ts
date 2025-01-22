import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { Food } from './food.entity';

@Entity('FoodImage')
export class FoodImage {
  @PrimaryGeneratedColumn()
  ImageID: number;

  @Column()
  FoodID: number;

  @Column({ type: 'varchar', length: 255 })
  ImageURL: string;

  @Column({ default: false })
  IsPrimary: boolean;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  CreatedAt: Date;

  @ManyToOne(() => Food, (food) => food.foodID)
  @JoinColumn({ name: 'FoodID' })
  food: Food;
}
