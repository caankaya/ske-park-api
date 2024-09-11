import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Vehicle {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  immatriculation: string;

  @Column({
    type: 'enum',
    enum: ['Car', 'Motor'],
  })
  type: string;
}
