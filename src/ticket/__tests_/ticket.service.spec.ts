import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/prisma/prisma.service';
import { TicketService } from '../ticket.service';
import { ConflictException } from '@nestjs/common';

describe('TicketService', () => {
  let ticketService: TicketService;
  let prismaService: PrismaService;

  const mockPrismaService = {
    ticket: {
      create: jest.fn(),
      findUnique: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TicketService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    ticketService = module.get<TicketService>(TicketService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  describe('create', () => {
    it('should create a ticket successfully', async () => {
      const createTicketDto = {
        reference: 'A3B7C9D1',
        start_time: new Date(),
        spot_number: 101,
        id_vehicle: 'ABC-123-DE',
      };
      const createdTicket = { ...createTicketDto };

      mockPrismaService.ticket.create.mockResolvedValue(createdTicket);

      const result = await ticketService.create(createTicketDto);
      expect(result).toEqual(createdTicket);
      expect(mockPrismaService.ticket.create).toHaveBeenCalledWith({
        data: createTicketDto,
      });
    });
  });

  describe('readOne', () => {
    it('should return a ticket with a vehicle', async () => {
      const ticketWithVehicle = {
        reference: 'A3B7C9D1',
        start_time: new Date(),
        spot_number: 101,
        id_vehicle: 'ABC-123-DE',
        vehicle: { immatriculation: 'ABC-123-DE', type: 'CAR' },
      };

      mockPrismaService.ticket.findUnique.mockResolvedValue(ticketWithVehicle);

      const result = await ticketService.readOne('A3B7C9D1');
      expect(result).toEqual(ticketWithVehicle);
      expect(mockPrismaService.ticket.findUnique).toHaveBeenCalledWith({
        where: { reference: 'A3B7C9D1' },
        include: { vehicle: true },
      });
    });

    it('should return null if no ticket is found', async () => {
      mockPrismaService.ticket.findUnique.mockResolvedValue(null);

      const result = await ticketService.readOne('NON_EXISTENT_REF');
      expect(result).toBeNull();
    });
  });

  describe('delete', () => {
    it('should delete a ticket successfully', async () => {
      const ticketReference = { reference: 'A3B7C9D1', spotNumber : 101 };

      const deletedTicket = {
        reference: 'A3B7C9D1',
        start_time: new Date(),
        spot_number: 101,
        id_vehicle: 'ABC-123-DE',
      };

      mockPrismaService.ticket.delete.mockResolvedValue(deletedTicket);

      const result = await ticketService.delete(ticketReference);
      expect(result).toEqual(deletedTicket);
      expect(mockPrismaService.ticket.delete).toHaveBeenCalledWith({
        where: { reference: 'A3B7C9D1' },
      });
    });
  });

  describe('generateReference', () => {
    it('should generate a unique reference string of 8 characters', () => {
      const reference = ticketService.generateReference();
      expect(reference).toHaveLength(8);
      expect(/^[A-Z0-9]{8}$/.test(reference)).toBeTruthy();
    });
  });
});
