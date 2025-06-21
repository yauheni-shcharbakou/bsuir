import { ChangeEvent, ReactNode } from 'react';
import {
  ComputerType,
  Option,
  RoomType,
  Event,
  User,
  OrderPopulated,
  RoomPopulated,
  ComputerPopulated,
  ReviewPopulated,
  BookingPopulated,
} from '../models';

export type LayoutProps = {
  title: string;
  children: ReactNode;
};

export type AppBarProps = {
  isAuth: boolean;
  isAdmin: boolean;
  logoutHandler(): Promise<void>;
};

type CrudCardProps = {
  pickHandler?: () => void;
  deleteHandler?: () => Promise<void>;
};

type CrudFormProps = {
  isEdit: boolean;
  isSubmitBlocked: boolean;
  submitHandler(): void;
};

export type ComputerTypeCardProps = CrudCardProps & {
  computerType: ComputerType;
};

export type ComputerTypeFormProps = CrudFormProps & {
  name: string;
  cpu: string;
  gpu: string;
  ram: string;
  changeNameHandler(event: ChangeEvent<HTMLInputElement>): void;
  changeRamHandler(event: ChangeEvent<HTMLInputElement>): void;
  changeCpuHandler(event: ChangeEvent<HTMLInputElement>): void;
  changeGpuHandler(event: ChangeEvent<HTMLInputElement>): void;
};

export type RoomTypeCardProps = CrudCardProps & {
  roomType: RoomType;
};

export type RoomTypeFormProps = CrudFormProps & {
  name: string;
  places: number;
  price: number;
  changeNameHandler(event: ChangeEvent<HTMLInputElement>): void;
  changePlacesHandler(event: ChangeEvent<HTMLInputElement>): void;
  changePriceHandler(event: ChangeEvent<HTMLInputElement>): void;
};

export type OptionCardProps = CrudCardProps & {
  option: Option;
  isAdmin?: boolean;
};

export type OptionFormProps = CrudFormProps & {
  name: string;
  description: string;
  price: number;
  changeNameHandler(event: ChangeEvent<HTMLInputElement>): void;
  changeDescriptionHandler(event: ChangeEvent<HTMLInputElement>): void;
  changePriceHandler(event: ChangeEvent<HTMLInputElement>): void;
};

export type EventCardProps = CrudCardProps & {
  event: Event;
  isAdmin?: boolean;
  readHandler?: () => Promise<void>;
};

export type EventFormProps = CrudFormProps & {
  name: string;
  date: Date;
  changeNameHandler(event: ChangeEvent<HTMLInputElement>): void;
  changeDateHandler(event: ChangeEvent<HTMLInputElement>): void;
};

export type UserCardProps = {
  user: User;
  updateRoleHandler(): Promise<void>;
  deleteHandler(): Promise<void>;
};

export type UserFormProps = {
  email: string;
  password: string;
  phone: string;
  nickname: string;
  isSubmitBlocked: boolean;
  changeEmailHandler(event: ChangeEvent<HTMLInputElement>): void;
  changePasswordHandler(event: ChangeEvent<HTMLInputElement>): void;
  changePhoneHandler(event: ChangeEvent<HTMLInputElement>): void;
  changeNicknameHandler(event: ChangeEvent<HTMLInputElement>): void;
  updateInfoHandler(): Promise<void>;
};

export type ProfileInfoCardProps = {
  user?: User;
  isAdmin: boolean;
};

export type ProfileItemFormProps = {
  title: string;
  value: string;
  placeholder: string;
  isEdit: boolean;
  isSubmitBlocked: boolean;
  editHandler(): void;
  inputHandler(event: ChangeEvent<HTMLInputElement>): void;
  submitHandler(): Promise<void>;
};

export type OrderCardProps = {
  order: OrderPopulated;
};

export type RoomCardProps = CrudCardProps & {
  room: RoomPopulated;
  isAdmin?: boolean;
};

export type RoomFormProps = CrudFormProps & {
  name: string;
  type: number;
  types: RoomType[];
  changeNameHandler(event: ChangeEvent<HTMLInputElement>): void;
  changeTypeHandler(event: ChangeEvent<HTMLInputElement>): void;
};

export type ComputerCardProps = CrudCardProps & {
  computer: ComputerPopulated;
  isAdmin?: boolean;
};

export type ComputerFormProps = CrudFormProps & {
  roomName: string;
  code: number;
  type: number;
  types: ComputerType[];
  changeCodeHandler(event: ChangeEvent<HTMLInputElement>): void;
  changeTypeHandler(event: ChangeEvent<HTMLInputElement>): void;
};

export type ReviewCardProps = {
  review: ReviewPopulated;
  isAdmin: boolean;
  userId?: number;
  updateHandler(id: number, text: string): Promise<void>;
  deleteHandler(): Promise<void>;
};

export type ReviewFormProps = {
  text: string;
  isSubmitBlocked: boolean;
  submitHandler(): void;
  changeTextHandler(event: ChangeEvent<HTMLInputElement>): void;
};

export type BookingCardProps = {
  booking: BookingPopulated;
  deleteHandler(): Promise<void>;
};
