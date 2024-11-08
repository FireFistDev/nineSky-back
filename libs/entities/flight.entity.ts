import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Parcel } from "./parcel.entity";
import { FlightFrom } from "libs/enums/flightsFrom.enum";

@Entity()
export class Flight {
    @PrimaryGeneratedColumn('uuid') // or use @PrimaryGeneratedColumn() for auto-incrementing numbers
    id: string; // Change to `number` if using auto-increment

    @Column({ unique: true })
    flight_id: string;

    @OneToMany(() => Parcel, (parcel) => parcel.flight)
    parcels: Parcel[];

    @Column({
        type: 'enum',
        enum: FlightFrom,
    })
    flight_from: FlightFrom;

    @Column()
    arrived_at: string;
}
