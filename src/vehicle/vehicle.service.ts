import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Vehicle } from './vehicle.entity';

const vehicle = 'vehicle';

@Injectable()
export class VehicleService {
  constructor(private dataSource: DataSource) {}

  async readAll(): Promise<Vehicle[] | null> {
    return this.dataSource.query(`SELECT * FROM "${vehicle}"`);
  }
}
