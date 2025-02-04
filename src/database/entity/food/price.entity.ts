import { BaseEntity } from 'src/common/common.entity';
import { Column, PrimaryGeneratedColumn } from 'typeorm';
export class Price extends BaseEntity {
  @PrimaryGeneratedColumn()
  PriceID: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: false,
  })
  Price: number;

  @Column({
    type: 'date',
    nullable: true,
  })
  ValidFrom: Date;

  @Column({
    type: 'date',
    nullable: true,
  })
  ValidTo: Date;
}
