import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { Vehicle } from 'src/vehicle/vehicle.entity';
import { Ticket } from 'src/ticket/ticket.entity';

@Entity()
export class Spot {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  numero: number;

  @Column({ default: true })
  etat: boolean;

  @OneToOne(() => Vehicle, (vehicle) => vehicle.spot)
  vehicle: Vehicle;

  @OneToMany(() => Ticket, (ticket) => ticket.spot)
  tickets: Ticket[];
}
