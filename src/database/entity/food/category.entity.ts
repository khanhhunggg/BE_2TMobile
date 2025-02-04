import { BaseEntity } from 'src/common/common.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Food } from './food.entity';

@Entity('Category')
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  CategoryID: number;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
  })
  CategoryName: string;

  @OneToMany(() => Food, (food) => food.category)
  @JoinColumn({ name: 'FoodID' })
  Foods: Food[];
}
