import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { SpotController } from '../spot.controller';
import { SpotService } from '../spot.service';

describe('SpotController', () => {
  let spotController: SpotController;
  let spotService: SpotService;

  const mockSpotService = {
    readAll: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SpotController],
      providers: [
        {
          provide: SpotService,
          useValue: mockSpotService,
        },
      ],
    }).compile();

    spotController = module.get<SpotController>(SpotController);
    spotService = module.get<SpotService>(SpotService);
  });

  describe('getAllSpots', () => {
    it('should return all spots and statistics', async () => {
      const result = [
        { number: 101, state: false },
        { number: 102, state: false },
        { number: 103, state: true },
        { number: 104, state: true },
        { number: 105, state: false },
        { number: 106, state: true },
      ];
      mockSpotService.readAll.mockResolvedValue(result);

      const response = await spotController.getAllSpots();
      expect(response).toEqual({
        spots: result,
        total: 6,
        available: 3,
        busy: 3,
        busyPercentage: '50',
      });
    });

    it('should throw NotFoundException if no spots are found', async () => {
      mockSpotService.readAll.mockResolvedValue([]);

      await expect(spotController.getAllSpots()).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should handle errors from the service', async () => {
      mockSpotService.readAll.mockRejectedValue(new Error('Service error'));

      await expect(spotController.getAllSpots()).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
