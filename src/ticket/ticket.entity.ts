import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Spot } from '../spot/spot.entity';
import { Vehicle } from 'src/vehicle/vehicle.entity';

@Entity()
export class Ticket {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  reference: string;

  @Column()
  start_time: Date;

  @Column()
  end_time: Date;

  @Column('decimal')
  montant: number;

  // Relation avec l'entité Spot
  @ManyToOne(() => Spot, (spot) => spot.tickets)
  @JoinColumn({ name: 'id_spot' })
  spot: Spot;

  // Relation avec l'entité Spot
  @ManyToOne(() => Vehicle, (vehicle) => vehicle.tickets)
  @JoinColumn({ name: 'id_vehicle' })
  vehicle: Vehicle;
}
