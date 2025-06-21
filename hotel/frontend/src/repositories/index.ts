import UserRepository from './UserRepository';
import AuthRepository from './AuthRepository';
import RoomRepository from './RoomRepository';
import BookingRepository from './BookingRepository';
import BuildingRepository from './BuildingRepository';
import CommentRepository from './CommentRepository';
import OptionRepository from './OptionRepository';
import TypeRepository from './TypeRepository';

export const authRepository = new AuthRepository();
export const bookingRepository = new BookingRepository();
export const buildingRepository = new BuildingRepository();
export const commentRepository = new CommentRepository();
export const optionRepository = new OptionRepository();
export const roomRepository = new RoomRepository();
export const typeRepository = new TypeRepository();
export const userRepository = new UserRepository();
