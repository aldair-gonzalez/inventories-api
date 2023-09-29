import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('losses_type')
export class LossesType {
  @PrimaryGeneratedColumn()
  loss_type_id: number;

  @Column({
    unique: true,
  })
  name: string;

  @Column()
  description: string;
}
