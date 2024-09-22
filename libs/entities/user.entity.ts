import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Parcel } from './parcel.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  password: string;
  @Column()
  email: string;
  @Column()
  first_name: string;
  @Column({ default: 0 })
  amount_to_paid: number;
  @Column()
  last_name: string;
  @Column()
  phone_number: number;
  @Column()
  personal_number: number;
  @Column()
  office: string;
  @Column()
  city: string;
  @Column()
  address: string;
  @OneToMany(() => Parcel, (parcel) => parcel.user)
  parcels: Parcel[]; // A user can have multiple parcels
}
