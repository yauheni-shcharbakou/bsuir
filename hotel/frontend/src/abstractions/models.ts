import { Role } from '../constants/enums';

export type Entity = { id: number };

type TBooking = Entity & {
  price: number;
  population: number;
  startDate: string | null;
  endDate: string | null;
  isActive: boolean;
};

type TBuilding = Entity & {
  address: string;
};

type TComment = Entity & {
  content: string;
};

type TOption = Entity & {
  name: string;
  price: number;
};

type TRoom = Entity & {
  isFree: boolean;
  population: number;
  bookedUntil: string | null;
};

type TType = Entity & {
  name: string;
  places: number;
  price: number;
};

type TUser = Entity & {
  email: string;
  password: string;
  role: Role;
  isActive: boolean;
};

export type Booking = TBooking & {
  room: number;
  createdBy: number;
  options: number[];
};

export type Building = TBuilding & {
  rooms: number[];
};

export type Comment = TComment & {
  room: number;
  createdBy: number;
};

export type Option = TOption;

export type Room = TRoom & {
  building: number;
  type: number;
  bookings: number[];
  comments: number[];
};

export type Type = TType & {
  options: number[];
  rooms: number[];
};

export type User = TUser & {
  bookings: number[];
};

export type BookingPopulated = TBooking & {
  room: Room;
  createdBy: User;
  options: Option[];
};

export type BuildingPopulated = TBuilding & {
  rooms: Room[];
};

export type CommentPopulated = TComment & {
  room: Room;
  createdBy: User;
};

export type RoomPopulated = TRoom & {
  building: Building;
  type: Type;
  bookings: Booking[];
  comments: Comment[];
};

export type TypePopulated = TType & {
  options: Option[];
  rooms: Room[];
};

export type UserPopulated = TUser & {
  bookings: Booking[];
};

export type AuthModel = {
  token: string;
};

export type DeleteModel = Entity;

export type BookingListModel = {
  active: BookingPopulated[];
  inActive: BookingPopulated[];
};

export type RoomPaginationModel = {
  amount: number;
  rooms: RoomPopulated[];
};

export type TokenModel = Pick<User, 'id' | 'email' | 'role'>;
