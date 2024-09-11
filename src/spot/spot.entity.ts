import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Ticket } from 'src/ticket/ticket.entity';

@Entity()
export class Spot {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  number: number;

  @Column({ default: true })
  state: boolean;

  @OneToMany(() => Ticket, (ticket) => ticket.spot)
  tickets: Ticket[];
}
