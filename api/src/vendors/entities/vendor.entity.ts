import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('vendors')
export class Vendors {
  @PrimaryGeneratedColumn()
  vendor_id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  description: string;

  @Column()
  address: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  zip_code: number;

  @Column({ unique: true })
  phone_number: number;

  @Column({ unique: true })
  email_address: string;

  @Column({ unique: true })
  website: string;

  @Column({})
  credit_limit: number;
}
