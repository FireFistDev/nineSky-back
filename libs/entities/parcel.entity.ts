import { Entity, Column, PrimaryColumn, ManyToOne, OneToOne } from 'typeorm';
import { User } from './user.entity';
import { ShippingStatus } from 'libs/enums/shipping.status.enum';
import { Declaration } from './Declaration.entity';
import { PaymentType } from 'libs/enums/payment.status.enum';

@Entity()
export class Parcel {
  @PrimaryColumn()
  tracking_id: number;
  
  @Column()
  flight_id: string;
    
  @Column()
  flight_from: string;

  @Column()
  arrived_at : number;

  @Column({ nullable: true }) 
  weight: string;

  @Column({ nullable: true })
  vol_weight: string;

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

  @OneToOne(() => Declaration, (Declaration) => Declaration.parcel)
  declaration: Declaration;

  @ManyToOne(() => User, (user) => user.parcels)
  user: User; 
}
