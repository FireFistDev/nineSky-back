import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Parcel } from './parcel.entity';

@Entity()
export class Declaration {
  @PrimaryGeneratedColumn()
  id: string; 

  @OneToOne(() => Parcel, (parcel) => parcel.declaration, { nullable: true })
  @JoinColumn({ name: 'parcelId' })
  parcel: Parcel;

  @Column({ nullable: true })
  parcelId: number;  
  
  @Column()
  type: string;

  @Column()
  price: string;
  @Column()
  website: string;
  @Column('text', { nullable: true })
  comment: string;

  @Column( { nullable: true })
  pdf_path: string; 
}
