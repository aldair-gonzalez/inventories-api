import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('categories')
export class Categories {
  @PrimaryGeneratedColumn()
  category_id: number;

  @Column({ unique: true })
  name: string;

  @Column({
    nullable: true,
  })
  description: string;
}
