import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { Car } from './car.entity';
import { Ticket } from './ticket.entity';

@Entity()
export class Spot {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  numero: number;

  @Column({ default: true })
  etat: boolean;

  @OneToOne(() => Car, (car) => car.spot)
  car: Car;

  @OneToMany(() => Ticket, (ticket) => ticket.spot)
  tickets: Ticket[];
}
