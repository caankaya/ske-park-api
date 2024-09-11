import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Spot } from '../spot/spot.entity';
import { Vehicle } from 'src/vehicle/vehicle.entity';

@Entity()
export class Ticket {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date_heure_emission: Date;

  @Column()
  duree_estimation: number;

  @Column('decimal')
  montant: number;

  @ManyToOne(() => Spot, (spot) => spot.tickets)
  spot: Spot;

  @ManyToOne(() => Vehicle, (vehicle) => vehicle.tickets)
  vehicle: Vehicle;
}
