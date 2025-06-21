import { Test } from '@nestjs/testing';
import { Event } from './event';
import { EventController } from './event.controller';
import { EventService } from './event.service';

const getByIdMock: Event = {
  id: 2,
  seenBy: [],
  name: 'test',
  date: new Date(),
};

const getAllMock = [];

describe('EventController', () => {
  let eventController: EventController;
  let eventService: EventService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [EventController],
    })
      .useMocker((token) => {
        if (token === EventService) {
          return {
            getAll: jest.fn().mockResolvedValue(getAllMock),
            getById: jest.fn().mockResolvedValue(getByIdMock),
          };
        }

        if (typeof token === 'function') {
          const mockMetadata = moduleRef.getMetadata(token) as any;
          const Mock = moduleRef.generateFromMetadata(mockMetadata);
          return new Mock();
        }
      })
      .compile();

    eventService = moduleRef.get(EventService);
    eventController = moduleRef.get(EventController);
  });

  describe('getAll', () => {
    it('should return an array of events', async () => {
      jest
        .spyOn(eventService, 'getAll')
        .mockImplementation(() => Promise.resolve(getAllMock));

      expect(await eventController.getAll()).toBe(getAllMock);
    });
  });

  describe('getById', () => {
    it('should return event', async () => {
      expect(await eventController.getById(1)).toBe(getByIdMock);
    });
  });
});
