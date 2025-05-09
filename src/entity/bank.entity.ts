import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('tbl_bank_accounts')
export class Bank {
  @PrimaryGeneratedColumn()
  bank_account_id: number;

  @Column({ length: 255 })
  bank_name: string;

  @Column({ length: 50, unique: true })
  bank_number: string;

  @Column({ length: 255 })
  user_bank_name: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
