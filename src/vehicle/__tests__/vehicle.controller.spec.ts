import { Test, TestingModule } from '@nestjs/testing';
import { VehicleController } from '../vehicle.controller';
import { VehicleService } from '../vehicle.service';
import { NotFoundException } from '@nestjs/common';
import { Vehicle } from '@prisma/client';

describe('VehicleController', () => {
  let vehicleController: VehicleController;
  let vehicleService: VehicleService;

  const mockVehicleService = {
    readAll: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VehicleController],
      providers: [
        {
          provide: VehicleService,
          useValue: mockVehicleService,
        },
      ],
    }).compile();

    vehicleController = module.get<VehicleController>(VehicleController);
    vehicleService = module.get<VehicleService>(VehicleService);
  });

  describe('getAllVehicles', () => {
    it('should return all cars and motors separately', async () => {
      const mockVehicles: Vehicle[] = [
        { immatriculation: 'ABC-123-DE', type: 'Car' },
        { immatriculation: 'FGH-456-IJ', type: 'Car' },
        { immatriculation: 'KLM-789-NO', type: 'Motor' },
      ];

      mockVehicleService.readAll.mockResolvedValue(mockVehicles);

      const result = await vehicleController.getAllVehicles();
      expect(result).toEqual({
        cars: [
          { immatriculation: 'ABC-123-DE', type: 'Car' },
          { immatriculation: 'FGH-456-IJ', type: 'Car' },
        ],
        motors: [{ immatriculation: 'KLM-789-NO', type: 'Motor' }],
      });

      expect(mockVehicleService.readAll).toHaveBeenCalled();
    });

    it('should throw a NotFoundException if no vehicles are found', async () => {
      mockVehicleService.readAll.mockResolvedValue([]);
      await expect(vehicleController.getAllVehicles()).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
