import { Test, TestingModule } from '@nestjs/testing';
import { VehicleService } from '../vehicle.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { Vehicle, VehicleType } from '@prisma/client';

// Mocker le service Prisma
const mockPrismaService = {
  vehicle: {
    findMany: jest.fn(),
    findFirst: jest.fn(),
    create: jest.fn(),
    delete: jest.fn(),
  },
};

describe('VehicleService', () => {
  let vehicleService: VehicleService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VehicleService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    vehicleService = module.get<VehicleService>(VehicleService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  describe('readAll', () => {
    it('should return all vehicles', async () => {
      const mockVehicles: Vehicle[] = [
        { immatriculation: 'ABC-123-DE', type: VehicleType.Car },
        { immatriculation: 'FGH-456-IJ', type: VehicleType.Motor },
      ];

      mockPrismaService.vehicle.findMany.mockResolvedValue(mockVehicles);

      const result = await vehicleService.readAll();
      expect(result).toEqual(mockVehicles);
      expect(mockPrismaService.vehicle.findMany).toHaveBeenCalled();
    });
  });

  describe('readOne', () => {
    it('should return a single vehicle by immatriculation', async () => {
      const mockVehicle: Vehicle = {
        immatriculation: 'ABC-123-DE',
        type: VehicleType.Car,
      };

      mockPrismaService.vehicle.findFirst.mockResolvedValue(mockVehicle);

      const result = await vehicleService.readOne('ABC-123-DE');
      expect(result).toEqual(mockVehicle);
      expect(mockPrismaService.vehicle.findFirst).toHaveBeenCalledWith({
        where: { immatriculation: 'ABC-123-DE' },
        include: { tickets: true },
      });
    });
  });

  describe('create', () => {
    it('should create and return a vehicle', async () => {
      const newVehicleData = {
        immatriculation: 'XYZ-789-WX',
        type: VehicleType.Car,
      };
      const createdVehicle: Vehicle = { ...newVehicleData };

      mockPrismaService.vehicle.create.mockResolvedValue(createdVehicle);

      const result = await vehicleService.create(newVehicleData);
      expect(result).toEqual(createdVehicle);
      expect(mockPrismaService.vehicle.create).toHaveBeenCalledWith({
        data: newVehicleData,
      });
    });
  });

  describe('delete', () => {
    it('should delete a vehicle and return the deleted vehicle', async () => {
      const mockVehicle: Vehicle = {
        immatriculation: 'ABC-123-DE',
        type: VehicleType.Car,
      };

      mockPrismaService.vehicle.delete.mockResolvedValue(mockVehicle);

      const result = await vehicleService.delete('ABC-123-DE');
      expect(result).toEqual(mockVehicle);
      expect(mockPrismaService.vehicle.delete).toHaveBeenCalledWith({
        where: { immatriculation: 'ABC-123-DE' },
      });
    });
  });
});
