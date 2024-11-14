

import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn, OneToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class UserDetails {
  @PrimaryColumn()
  id: string;

  @OneToOne(() => User, (user) => user.userDetails)
  @JoinColumn()
  user: User;
  
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
