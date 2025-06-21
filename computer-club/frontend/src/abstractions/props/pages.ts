import {
  ComputerType,
  Option,
  RoomType,
  Event,
  RoomPopulated,
  ComputerPopulated,
  ReviewPopulated,
  BookingPopulated,
} from '../models';

export type AdminComputerTypesPageProps = {
  initComputerTypes: ComputerType[];
};

export type AdminRoomTypesPageProps = {
  initRoomTypes: RoomType[];
};

export type AdminOptionsPageProps = {
  initOptions: Option[];
};

export type AdminEventsPageProps = {
  initEvents: Event[];
};

export type OptionsPageProps = AdminOptionsPageProps;

export type AdminRoomsPageProps = {
  initRoomTypes: RoomType[];
  initRooms: RoomPopulated[];
};

export type RoomsPageProps = {
  initRooms: RoomPopulated[];
};

export type RoomPageProps = {
  room: RoomPopulated;
  initComputers: ComputerPopulated[];
  initReviews: ReviewPopulated[];
};

export type AdminRoomPageProps = RoomPageProps & {
  computerTypes: ComputerType[];
};

export type ComputerPageProps = {
  computer: ComputerPopulated;
  initBookings: BookingPopulated[];
};
