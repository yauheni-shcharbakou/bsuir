import { AuthRepository } from './auth.repository';
import { MainRepository } from './main.repository';
import { UserRepository } from './user.repository';
import { EventRepository } from './event.repository';
import { OptionRepository } from './option.repository';
import { OrderRepository } from './order.repository';
import { ComputerTypeRepository } from './computer-type.repository';
import { RoomTypeRepository } from './room-type.repository';
import { BookingRepository } from './booking.repository';
import { ReviewRepository } from './review.repository';
import { ComputerRepository } from './computer.repository';
import { RoomRepository } from './room.repository';

export {
  MainRepository,
  AuthRepository,
  UserRepository,
  EventRepository,
  OptionRepository,
  OrderRepository,
  ComputerTypeRepository,
  RoomTypeRepository,
  BookingRepository,
  ReviewRepository,
  ComputerRepository,
  RoomRepository,
};

export const mainRepository = new MainRepository();
export const authRepository = new AuthRepository();
export const userRepository = new UserRepository();
export const eventRepository = new EventRepository();
export const optionRepository = new OptionRepository();
export const orderRepository = new OrderRepository();
export const computerTypeRepository = new ComputerTypeRepository();
export const roomTypeRepository = new RoomTypeRepository();
export const bookingRepository = new BookingRepository();
export const reviewRepository = new ReviewRepository();
export const computerRepository = new ComputerRepository();
export const roomRepository = new RoomRepository();
