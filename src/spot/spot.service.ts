import { Injectable } from '@nestjs/common';
import { Spot } from './spot.entity';
import { DataSource } from 'typeorm';

const spot = 'spot';
const vehicle = 'vehicle';
const ticket = 'ticket';

@Injectable()
export class SpotService {
  constructor(private dataSource: DataSource) {}

  async readAll(): Promise<Spot[] | null> {
    return await this.dataSource.query(
      `SELECT 
         "${spot}".id AS spot_id, 
         "${spot}".numero, 
         "${spot}".etat, 
         "${ticket}".reference AS ticket_reference, 
         "${ticket}".montant AS ticket_montant, 
         "${vehicle}".immatriculation AS vehicle_immatriculation, 
         "${vehicle}".type AS vehicle_type
       FROM "${spot}" 
       LEFT JOIN "${ticket}" ON "${spot}".id = "${ticket}".id_spot 
       LEFT JOIN "${vehicle}" ON "${vehicle}".id = "${ticket}".id_vehicle
       ORDER BY "${spot}".id ASC
       `,
    );
  }
}
