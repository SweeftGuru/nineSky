import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { Parcel } from './parcel.entity';

@Entity()
export class Flight {
  @PrimaryColumn()
  flight_id: number;

  @Column()
  fligt_from: string;
  @Column()
  arrival_date: string;

  @OneToMany(() => Parcel, (parcel) => parcel.flight)
  parcels: Parcel[];
}
