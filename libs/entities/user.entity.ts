import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Parcel } from './parcel.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  password: string;
  @Column()
  email: string;
  @Column()
  first_name: string;

  @Column()
  amount_to_paid: number;
  @Column()
  last_name: string;

  @Column()
  phone_number: number;

  @Column()
  personal_number: number;

  @OneToMany(() => Parcel, (parcel) => parcel.user)
  parcels: Parcel[]; // A user can have multiple parcels
}
