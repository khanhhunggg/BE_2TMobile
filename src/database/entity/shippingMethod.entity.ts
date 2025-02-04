import { BaseEntity } from 'src/common/common.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('ShippingMethods')
export class ShippingMethodEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  ShippingMethodID: number;

  @Column({ type: 'varchar', length: 50, unique: true })
  Name: string;

  @Column({ type: 'text', nullable: true })
  Description: string | null;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  Price: number;

  @Column({ type: 'varchar', length: 50 })
  EstimatedTime: string;

  @Column({ type: 'boolean', default: true })
  IsActive: boolean;
}
