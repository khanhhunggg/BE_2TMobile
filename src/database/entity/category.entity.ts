import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Food } from './food/food.entity';

@Entity('Category')
export class Category {
  @PrimaryGeneratedColumn()
  CategoryID: number;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
  })
  CategoryName: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  CreatedAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  UpdatedAt: Date;

  @OneToMany(() => Food, (food) => food.category)
  @JoinColumn({ name: 'FoodID' })
  Foods: Food[];
}
