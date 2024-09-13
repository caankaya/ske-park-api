import { Test, TestingModule } from '@nestjs/testing';
import { SpotService } from '../spot.service';
import { PrismaService } from '../../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';

describe('SpotService', () => {
  let spotService: SpotService;
  let prismaService: PrismaService;

  const mockPrismaService = {
    spot: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SpotService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    spotService = module.get<SpotService>(SpotService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  describe('readAll', () => {
    it('should return all spots', async () => {
      const mockSpots = [
        { number: 101, state: true },
        { number: 102, state: false },
      ];
      mockPrismaService.spot.findMany.mockResolvedValue(mockSpots);

      const result = await spotService.readAll();
      expect(result).toEqual(mockSpots);
      expect(prismaService.spot.findMany).toHaveBeenCalled();
    });
  });

  describe('readOne', () => {
    it('should return a spot by number', async () => {
      const mockSpot = { number: 101, state: true };
      mockPrismaService.spot.findUnique.mockResolvedValue(mockSpot);

      const result = await spotService.readOne(101);
      expect(result).toEqual(mockSpot);
      expect(prismaService.spot.findUnique).toHaveBeenCalledWith({
        where: { number: 101 },
      });
    });

    it('should return null if no spot is found', async () => {
      mockPrismaService.spot.findUnique.mockResolvedValue(null);

      const result = await spotService.readOne(999);
      expect(result).toBeNull();
      expect(prismaService.spot.findUnique).toHaveBeenCalledWith({
        where: { number: 999 },
      });
    });
  });

  describe('update', () => {
    it('should update a spot and return the updated spot', async () => {
      const mockUpdatedSpot = { number: 101, state: false };
      mockPrismaService.spot.update.mockResolvedValue(mockUpdatedSpot);

      const result = await spotService.update({
        number: 101,
        column: 'state',
        value: false,
      });
      expect(result).toEqual(mockUpdatedSpot);
      expect(prismaService.spot.update).toHaveBeenCalledWith({
        where: { number: 101 },
        data: { state: false },
      });
    });
  });
});
