

import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class UserDetails {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  phone_number: string;

  @Column({ unique: true })
  personal_number: string;

  @Column()
  office: string;

  @Column()
  city: string;

  @Column()
  address: string;
}
