import { Entity, Column, PrimaryColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { ShippingStatus } from 'libs/enums/shipping.status.enum';
import { Declaration } from './Declaration.entity';
import { PaymentType } from 'libs/enums/payment.status.enum';
import { Flight } from './flight.entity';

@Entity()
export class Parcel {

  @PrimaryGeneratedColumn()
  id : string;
  @Column({ unique: true })
  tracking_id: string;
  
  @Column({ nullable: true }) 
  weight: number;

  @Column()
  price: number;

  @Column({
    type: 'enum',
    enum: ShippingStatus,
    default: ShippingStatus.BROUGHT,
  })
  shipping_status: ShippingStatus;

  @Column({
    type: 'enum',
    enum: PaymentType,
    default: PaymentType.UNPAID,
  })
  payment_status: string;

  @OneToOne(() => Declaration,{ cascade: true })
  @JoinColumn() 
  declaration: Declaration;

  @ManyToOne(() => User, (user) => user.parcels)
  owner: User; 


  @ManyToOne(() => Flight, (flight) => flight.parcels)
  @JoinColumn()
  flight: Flight;
}
