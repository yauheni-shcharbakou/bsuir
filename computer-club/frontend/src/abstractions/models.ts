import { UserRole } from '../constants/enums';

type Entity = {
  id: number;
};

export type User = Entity & {
  email: string;
  password: string;
  phone: string;
  nickname: string;
  role: UserRole;
};

export type Event = Entity & {
  name: string;
  date: string;
  isNew?: boolean;
};

export type Option = Entity & {
  name: string;
  description: string;
  price: number;
};

export type Order = Entity & {
  amount: number;
  createdAt: string;
};

export type ComputerType = Entity & {
  name: string;
  ram: string;
  cpu: string;
  gpu: string;
};

export type RoomType = Entity & {
  name: string;
  places: number;
  price: number;
};

export type Booking = Entity & {
  date: string;
  hours: number;
};

export type Review = Entity & {
  text: string;
};

export type Computer = Entity & {
  code: number;
};

export type Room = Entity & {
  name: string;
};

export type OrderPopulated = Order & {
  option: Option;
};

export type ReviewPopulated = Review & {
  user: User;
};

export type ComputerPopulated = Computer & {
  bookings: Booking[];
  type: ComputerType;
  room: Room;
};

export type RoomPopulated = Room & {
  computers: Computer[];
  reviews: Review[];
  type: RoomType;
};

export type BookingPopulated = Booking & {
  user: User;
  computer: Computer;
};
