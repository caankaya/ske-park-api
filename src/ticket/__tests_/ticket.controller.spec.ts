import { Test, TestingModule } from '@nestjs/testing';
import { TicketController } from '../ticket.controller';
import { TicketService } from '../ticket.service';
import { VehicleService } from '../../vehicle/vehicle.service';
import { SpotService } from '../../spot/spot.service';
import { ConflictException, NotFoundException } from '@nestjs/common';

describe('TicketController', () => {
  let ticketController: TicketController;
  let ticketService: TicketService;
  let vehicleService: VehicleService;
  let spotService: SpotService;

  const mockTicketService = {
    create: jest.fn(),
    readOne: jest.fn(),
    delete: jest.fn(),
    generateReference: jest.fn(),
  };

  const mockVehicleService = {
    create: jest.fn(),
    readOne: jest.fn(),
    delete: jest.fn(),
  };

  const mockSpotService = {
    readOne: jest.fn(),
    update: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TicketController],
      providers: [
        { provide: TicketService, useValue: mockTicketService },
        { provide: VehicleService, useValue: mockVehicleService },
        { provide: SpotService, useValue: mockSpotService },
      ],
    }).compile();

    ticketController = module.get<TicketController>(TicketController);
    ticketService = module.get<TicketService>(TicketService);
    vehicleService = module.get<VehicleService>(VehicleService);
    spotService = module.get<SpotService>(SpotService);
  });

  describe('createTicket', () => {
    it('should create a ticket successfully', async () => {
      const entryVehicle = {
        number: 1,
        immatriculation: 'ABC-123-DE',
        type: 'Car',
      };

      const mockSpot = { number: 1, state: true };
      const mockVehicle = { immatriculation: 'ABC-123-DE', type: 'Car' };
      const mockTicket = { reference: 'A3B7C9D1', vehicle: mockVehicle };

      mockVehicleService.readOne.mockResolvedValue(null); // No existing vehicle
      mockSpotService.readOne.mockResolvedValue(mockSpot); // Spot is available
      mockTicketService.generateReference.mockReturnValue('A3B7C9D1');
      mockTicketService.readOne.mockResolvedValue(null); // No ticket with same reference
      mockVehicleService.create.mockResolvedValue(mockVehicle);

      const response = await ticketController.createTicket(entryVehicle);

      expect(response).toEqual({ message: 'Ticket a été créé avec succès' });
      expect(mockVehicleService.readOne).toHaveBeenCalledWith('ABC-123-DE');
      expect(mockSpotService.readOne).toHaveBeenCalledWith(1);
      expect(mockSpotService.update).toHaveBeenCalledWith({
        number: 1,
        column: 'state',
        value: false,
      });
      expect(mockVehicleService.create).toHaveBeenCalledWith({
        immatriculation: 'ABC-123-DE',
        type: 'Car',
      });
      expect(mockTicketService.create).toHaveBeenCalledWith({
        reference: 'A3B7C9D1',
        start_time: expect.any(Date),
        spot_number: 1,
        id_vehicle: 'ABC-123-DE',
      });
    });

    it('should throw ConflictException if vehicle already has a ticket', async () => {
      const entryVehicle = {
        number: 1,
        immatriculation: 'ABC-123-DE',
        type: 'Car',
      };

      const existingTicket = { reference: 'A3B7C9D1' };

      mockVehicleService.readOne.mockResolvedValue(existingTicket);

      await expect(ticketController.createTicket(entryVehicle)).rejects.toThrow(
        ConflictException,
      );
    });

    it('should throw ConflictException if spot is not available', async () => {
      const entryVehicle = {
        number: 1,
        immatriculation: 'ABC-123-DE',
        type: 'Car',
      };

      mockVehicleService.readOne.mockResolvedValue(null);
      mockSpotService.readOne.mockResolvedValue({ number: 1, state: false }); // Spot unavailable

      await expect(ticketController.createTicket(entryVehicle)).rejects.toThrow(
        ConflictException,
      );
    });
  });

  describe('deleteTicket', () => {
    it('should delete a ticket successfully', async () => {
      const ticketReference = { reference: 'A3B7C9D1', spotNumber: 1 };
      const mockVehicle = { immatriculation: 'ABC-123-DE', type: 'Car' };
      const mockTicket = { reference: 'A3B7C9D1', vehicle: mockVehicle };

      mockTicketService.readOne.mockResolvedValue(mockTicket);

      const response = await ticketController.deleteTicket(ticketReference);

      expect(response).toEqual({
        message: 'Le ticket a été supprimé, et la place est désormais libre.',
      });
      expect(mockTicketService.readOne).toHaveBeenCalledWith('A3B7C9D1');
      expect(mockTicketService.delete).toHaveBeenCalledWith(ticketReference);
      expect(mockVehicleService.delete).toHaveBeenCalledWith('ABC-123-DE');
      expect(mockSpotService.update).toHaveBeenCalledWith({
        number: 1,
        column: 'state',
        value: true,
      });
    });

    it('should throw ConflictException if ticket or vehicle is not found', async () => {
      const ticketReference = { reference: 'A3B7C9D1', spotNumber: 1 };

      mockTicketService.readOne.mockResolvedValue(null);

      await expect(
        ticketController.deleteTicket(ticketReference),
      ).rejects.toThrow(ConflictException);
    });
  });
});
