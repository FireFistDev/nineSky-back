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
  @OneToOne(() => Parcel, (parcel) => parcel.declaration)
  parcel: Parcel;
  @Column()
  type: string;

  @Column()
  price: string;
  @Column()

  website: string;

  @Column('text', { nullable: true })
  comment: string;

  @Column({
    type: 'bytea',  // Use 'bytea' for binary data in PostgreSQL
    nullable: true, // Add `nullable` if this field is optional
  })
  invoice_Pdf: Buffer;
}
