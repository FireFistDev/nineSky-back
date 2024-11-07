import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Declaration {
  @PrimaryGeneratedColumn()
  id: string;

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
