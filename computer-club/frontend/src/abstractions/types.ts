import { BookingPopulated } from './models';

export type BookingTableHours = {
  [hour: string]: {
    date: Date;
    booking?: BookingPopulated;
  };
};

export type BookingTable = {
  [title: string]: {
    day: number;
    hours: BookingTableHours;
  };
};

export type BookingTableCellData = {
  key: string;
  className: string;
  date: Date;
  booking?: BookingPopulated;
  isDeleteAllowed: boolean;
};

export type BookingTableRowsData = {
  hour: string;
  cells: BookingTableCellData[];
};
