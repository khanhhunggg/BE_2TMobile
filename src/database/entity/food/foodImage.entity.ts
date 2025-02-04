import { BaseEntity } from 'src/common/common.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Food } from './food.entity';

@Entity('FoodImage')
export class FoodImage extends BaseEntity {
  @PrimaryGeneratedColumn()
  ImageID: number;

  @Column()
  FoodID: number;

  @Column({ type: 'varchar', length: 255 })
  ImageURL: string;

  @Column({ default: false })
  IsPrimary: boolean;

  @ManyToOne(() => Food, (food) => food.foodID)
  @JoinColumn({ name: 'FoodID' })
  food: Food;
}
