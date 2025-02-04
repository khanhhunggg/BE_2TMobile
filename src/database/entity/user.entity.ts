import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Cart } from './cart/cart.entity';
import { Order } from './order/order.entity';

@Entity('User')
export class User {
  @PrimaryGeneratedColumn()
  UserID: number;

  @Column({ type: 'varchar', length: 50, unique: true })
  Username: string;

  @Column({ type: 'varchar', length: 255 })
  PasswordHash: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  FullName: string;

  @Column({ type: 'varchar', length: 100, unique: true, nullable: true })
  Email: string;

  @Column({ type: 'varchar', length: 15, unique: true, nullable: true })
  PhoneNumber: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  Address: string;

  @Column({
    type: 'enum',
    enum: ['Admin', 'Customer'],
    default: 'Customer',
  })
  Role: 'Admin' | 'Customer';

  @Column({
    type: 'enum',
    enum: ['Male', 'Female', 'Other'],
    default: 'Other',
  })
  Gender: 'Male' | 'Female' | 'Other';

  @Column({ type: 'date', nullable: true })
  BirthDate: string;

  @OneToMany(() => Cart, (cart) => cart.user)
  carts: Cart[];

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];
}
