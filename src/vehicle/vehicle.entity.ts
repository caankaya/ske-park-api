import { Spot } from 'src/spot/spot.entity';
import { Ticket } from 'src/ticket/ticket.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Vehicle {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  immatriculation: string;

  @Column()
  type: string;

  // Relation avec l'entité Spot
  @OneToOne(() => Spot, (spot) => spot.vehicle)
  spot: Spot;

  // Relation avec l'entité Spot
  @OneToMany(() => Ticket, (ticket) => ticket.vehicle)
  tickets: Ticket[];
}
