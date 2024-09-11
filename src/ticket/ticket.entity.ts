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

  @Column({ type: 'timestamp', nullable: true })
  start_time: Date;

  @Column({ type: 'timestamp', nullable: true })
  end_time: Date;

  @Column('double precision', { nullable: true })
  amount: number;

  @ManyToOne(() => Spot, (spot) => spot.tickets, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_spot' })
  spot: Spot;

  @ManyToOne(() => Vehicle, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_vehicle' })
  vehicle: Vehicle;
}
