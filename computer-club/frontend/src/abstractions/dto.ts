export type DeleteDto = {
  id: number;
};

export type AuthDto = {
  token: string;
};

export type HealthCheckDto = {
  status: string;
};

export type OrderDto = {
  option: number;
  amount: number;
};

export type RoomDto = {
  name: string;
  type: number;
};

export type ComputerDto = {
  code: number;
  type: number;
};

export type BookingDto = {
  date: string;
  hours: number;
};
