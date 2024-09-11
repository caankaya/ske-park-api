import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Spot } from './spot.entity';
import { Car } from './car.entity';

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

  @ManyToOne(() => Car, (car) => car.tickets)
  car: Car;
}
