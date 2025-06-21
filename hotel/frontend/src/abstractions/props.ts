import {
  Building,
  Comment,
  Option,
  Type,
  RoomPopulated,
  BookingPopulated,
  UserPopulated,
  TypePopulated,
} from './models';
import { ChangeEvent } from 'react';
import { BoxProps, ButtonProps, SelectChangeEvent, TypographyProps } from '@mui/material';

export type LayoutProps = {
  title: string;
};

export type NavProps = {
  toggleTheme(): void;
};

export type AuthWrapperProps = {
  onlyAdmin: boolean;
};

export type RoomInfoProps = {
  room: RoomPopulated;
};

export type SelectProps = {
  label?: string | number;
  value?: string | number;
  options: string[] | number[];
  values: string[] | number[];
  changeHandler(value: string): void;
};

// export type RoomCardProps = {
//   room: RoomPopulated;
//   clickHandler(room: RoomPopulated): void;
//   onChange(id: number): void;
//   onDelete(id: number): void;
//   isAdmin: boolean;
// };

export type RoomOptionContainerProps = {
  options: Option[];
  checked: string[];
  onChange(checked: boolean, option: Option): void;
};

export type RoomPriceContainerProps = {
  value: number;
};

export type RoomBookContainerProps = {
  selectOptions: string[];
  selectValues: number[];
  selectValue: number;
  selectHandler(value: string): void;
  bookHandler(): void;
};

export type PreloaderProps = {
  isDark: boolean;
};

export type BookingCardProps = {
  order: BookingPopulated;
  onDelete(booking: BookingPopulated): void;
};

// export interface BasketCardProps {
//   basket: BasketPopulated;
//   sortDate: Date;
//   onChangeRole(user: User): void;
//   onDelete(basketId: string, userId: string): void;
// }

export type DatePickerProps = {
  onChange(value: Date | null): void;
};

export type BaseCardProps = {
  onPick(): void;
  onDelete(): void;
};

export type BuildingCardProps = {
  building: Building;
  onPick(building: Building): void;
  onDelete(id: number): void;
};

export type OptionCardProps = {
  option: Option;
  onPick(option: Option): void;
  onDelete(id: number): void;
};

export type RoomCardProps = {
  room: RoomPopulated;
  onPick(room: RoomPopulated): void;
  onDelete(id: number): void;
};

export type TypeCardProps = {
  type: TypePopulated;
  onPick(type: TypePopulated): void;
  onDelete(id: number): void;
};

export type UserCardProps = {
  user: UserPopulated;
  selfEmail: string;
  // sortDate: Date;
  onChangeRole(user: UserPopulated): void;
  onPick(user: UserPopulated): void;
  onDelete(id: number): void;
};

export type PageButtonProps = {
  title: string;
  path: string;
};

export type RoomCreateFormProps = {
  loadRooms(): void;
};

export type CommentCardProps = {
  comment: Comment;
  isOwner: boolean;
  onChange(comment: Comment): void;
  onDelete(id: number): void;
};

export type SpoilerProps = {
  title: string;
};

export type AuthFormProps = {
  title: string;
  changeEmailHandler: (e: ChangeEvent<HTMLInputElement>) => void;
  changePasswordHandler: (e: ChangeEvent<HTMLInputElement>) => void;
};

export type BuildingFormProps = {
  address: string;
  isEdit: boolean;
  isSubmitDisabled: boolean;
  onChangeAddress(e: ChangeEvent<HTMLInputElement>): void;
  onSubmit(): void;
};

export type OptionFormProps = {
  name: string;
  price: number | string;
  isEdit: boolean;
  isSubmitDisabled: boolean;
  onChangeName(e: ChangeEvent<HTMLInputElement>): void;
  onChangePrice(e: ChangeEvent<HTMLInputElement>): void;
  onSubmit(): void;
};

export type RoomFormProps = {
  building: string;
  type: string;
  buildings: Building[];
  types: TypePopulated[];
  isEdit: boolean;
  isSubmitDisabled: boolean;
  onChangeBuilding(e: SelectChangeEvent): void;
  onChangeType(e: SelectChangeEvent): void;
  onSubmit(): void;
};

export type TypeFormProps = {
  name: string;
  price: number | string;
  places: number | string;
  checkedOptions: number[];
  options: Option[];
  isEdit: boolean;
  isSubmitDisabled: boolean;
  onChangeName(e: ChangeEvent<HTMLInputElement>): void;
  onChangePrice(e: ChangeEvent<HTMLInputElement>): void;
  onChangePlaces(e: ChangeEvent<HTMLInputElement>): void;
  onChangeOptions(id: number, checked: boolean): void;
  onSubmit(): void;
};

export type UserFormProps = {
  email: string;
  password: string;
  isEdit: boolean;
  isSubmitDisabled: boolean;
  onChangeEmail(e: ChangeEvent<HTMLInputElement>): void;
  onChangePassword(e: ChangeEvent<HTMLInputElement>): void;
  onSubmit(): void;
};

export type UsersPageProps = {
  initialUsers: UserPopulated[];
};

export type BuildingsPageProps = {
  initialBuildings: Building[];
};

export type TypesPageProps = {
  initialTypes: TypePopulated[];
  initialOptions: Option[];
};

export type OptionsPageProps = {
  initialOptions: Option[];
};

export type RoomsPageProps = {
  initialRooms: RoomPopulated[];
  initialBuildings: Building[];
  initialTypes: TypePopulated[];
};

export type StyledButtonProps = ButtonProps & {
  primary?: boolean;
};

export type StyledFormContainerProps = BoxProps & {
  large?: boolean;
};

export type StyledBoxProps = BoxProps & {
  column?: boolean;
};

export type StyledTypographyProps = TypographyProps & {
  component?: string;
};
