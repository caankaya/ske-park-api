import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { Spot } from './spot.entity';
import { Ticket } from './ticket.entity';

@Entity()
export class Car {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  immatriculation: string;

  @Column()
  type: string;

  @OneToOne(() => Spot, (spot) => spot.car)
  spot: Spot;

  @OneToMany(() => Ticket, (ticket) => ticket.car)
  tickets: Ticket[];
}
