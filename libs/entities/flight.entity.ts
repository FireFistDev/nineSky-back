import { Entity, Column, PrimaryColumn, OneToMany , PrimaryGeneratedColumn } from 'typeorm';
import { Parcel } from './parcel.entity';

@Entity()
export class Flight {
  @PrimaryGeneratedColumn()
  flight_id: number;

  @Column()
  flight_from: string;
  @Column()
  arrival_date: string;

  @OneToMany(() => Parcel, (parcel) => parcel.flight)
  parcels: Parcel[];
}
