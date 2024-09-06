import { Entity, Column, PrimaryColumn, ManyToOne, OneToOne } from 'typeorm';
import { Flight } from './flight.entity';
import { User } from './user.entity';
import { ShippingStatus } from 'libs/enums/shipping.status.enum';
import { Declaration } from './Declaration.entity';

@Entity()
export class Parcel {
  @PrimaryColumn()
  tracking_id: number;

  @Column()
  weight: string;

  @Column()
  vol_weight: string;

  @Column()
  price: number;

  @Column({
    type: 'enum',
    enum: ShippingStatus,
    default: ShippingStatus.BROUGHT, // Default value if none is provided
  })
  shipping_status: ShippingStatus;

  @Column()
  payment_status: string;

  @OneToOne(() => Declaration, (Declaration) => Declaration.parcel)
  declaration: Declaration;

  @ManyToOne(() => Flight, (flight) => flight.parcels)
  flight: Flight;

  @ManyToOne(() => User, (user) => user.parcels)
  user: User; // Many parcels can belong to one user
}
