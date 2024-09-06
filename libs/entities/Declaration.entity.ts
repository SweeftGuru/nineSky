import {
  Column,
  Entity,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Parcel } from './parcel.entity';

@Entity()
export class Declaration {
  @PrimaryGeneratedColumn()
  id: number; // Use a generated column for IDs

  @OneToOne(() => Parcel, (parcel) => parcel.declaration, { nullable: true })
  parcel: Parcel;
  @Column()
  type: string; // Type of declaration

  @Column()
  price: string;
  @Column()
  website: string; // Website associated with declaration
  @Column('text', { nullable: true })
  comment: string; // Optional comment

  @Column()
  pdf_path: string; // Path to the PDF document
}
