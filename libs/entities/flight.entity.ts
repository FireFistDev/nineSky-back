import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Parcel } from "./parcel.entity";

@Entity()
export class Flight {
    @PrimaryGeneratedColumn()
    id : string;
    @Column({unique: true})
    flight_id: string;
    @OneToMany(() => Parcel, (parcel) => parcel.flight)
    @JoinColumn()
    parcels: Parcel[];
    
    @Column()
    flight_from: string;
  
    @Column()
    arrived_at : string;
  
}