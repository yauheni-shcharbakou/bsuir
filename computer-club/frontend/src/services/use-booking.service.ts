import { BookingPopulated } from '../abstractions/models';
import { BookingRepository, ComputerRepository } from '../repositories';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Route } from '../constants/enums';
import { BookingDto } from '../abstractions/dto';
import moment from 'moment/moment';
import { BookingTable, BookingTableRowsData } from '../abstractions/types';

export const useBookingService = (initBookings: BookingPopulated[] = [], isAdmin = false, userId?: number) => {
  const { pathname } = useRouter();
  const bookingRepository = new BookingRepository();
  const computerRepository = new ComputerRepository();

  const getBookingTable = (): BookingTable => {
    const initDate = new Date();
    let currentDate = new Date(initDate.getFullYear(), initDate.getMonth(), initDate.getDate());
    const endDate = new Date(initDate.getFullYear(), initDate.getMonth(), initDate.getDate() + 7);

    const bookingTable: BookingTable = {};

    do {
      const currentHours: number = currentDate.getHours();

      const booking: BookingPopulated | undefined = bookings.find((b: BookingPopulated) => {
        const bookingDate: Date = moment(b.date).toDate();
        const isItDay: boolean = bookingDate.getDate() === currentDate.getDate();
        const bookingHours: number = bookingDate.getHours();

        const datesRange: number[] = [...Array(b.hours)].map((_, index: number) => index + bookingHours);
        const isItHour: boolean = bookingHours === currentHours || datesRange.includes(currentHours);

        return isItDay && isItHour;
      });

      const dayTitle: string = moment(currentDate).format('D MMM');
      const dayBlock = bookingTable[dayTitle];

      if (dayBlock) {
        dayBlock.hours = {
          ...dayBlock.hours,
          [currentDate.getHours().toString()]: {
            date: currentDate,
            booking,
          },
        };
      } else {
        bookingTable[dayTitle] = {
          day: currentDate.getDate(),
          hours: {
            [currentDate.getHours().toString()]: {
              date: currentDate,
              booking,
            },
          },
        };
      }

      currentDate = new Date(currentDate.setHours(currentDate.getHours() + 1));
    } while (endDate.getTime() > currentDate.getTime());

    return bookingTable;
  };

  const getTableRowsData = (): BookingTableRowsData[] => {
    const tableHours: string[] = Object.keys(Object.values(bookingTable)[0]?.hours || {});

    return tableHours.reduce((acc: BookingTableRowsData[], hour: string) => {
      acc.push({
        hour,
        cells: Object.keys(bookingTable).map((day: string) => {
          let className = 'text-center ';

          const booking = bookingTable[day]?.hours?.[hour]?.booking;
          const date = bookingTable[day]?.hours?.[hour]?.date || new Date();
          const isDeleteAllowed = isAdmin || booking?.user?.id === userId;

          switch (true) {
            case booking && userId && booking.user?.id === userId:
              className += `bg-success`;
              break;
            case booking && userId && booking.user?.id !== userId:
              className += `bg-danger`;
              break;
            default:
              className += `bg-primary`;
              break;
          }

          return {
            key: `${day}-${hour}`,
            className,
            booking,
            isDeleteAllowed,
            date: moment(date).add(-1, 'hour').toDate(),
          };
        }),
      });

      return acc;
    }, []);
  };

  const [bookings, setBookings] = useState(initBookings);
  const [bookingTable, setBookingTable] = useState<BookingTable>({});
  const [tableRowsData, setTableRowsData] = useState<BookingTableRowsData[]>([]);

  useEffect(() => {
    if (pathname === Route.BOOKINGS) {
      bookingRepository.getByUser().then((response: BookingPopulated[]) => setBookings(() => response));
    } else {
      setBookingTable(() => getBookingTable());
      setTableRowsData(() => getTableRowsData());
    }
  }, []);

  useEffect(() => setBookingTable(() => getBookingTable()), [bookings]);
  useEffect(() => setTableRowsData(() => getTableRowsData()), [bookingTable, isAdmin, userId]);

  const bookHandler = (computerId: number, date: Date) => {
    return async () => {
      try {
        const bookingDto: BookingDto = { date: moment(date).format(), hours: 1 };
        const booking: BookingPopulated = await computerRepository.createComputerBooking(computerId, bookingDto);

        setBookings(() => [...bookings, booking]);
      } catch (e) {
        console.log(e);
      }
    };
  };

  const deleteHandler = (id: number) => {
    return async () => {
      try {
        const deletedId: number = await bookingRepository.delete(id);
        setBookings(() => bookings.filter(({ id: existsId }) => existsId !== deletedId));
      } catch (e) {
        console.log(e);
      }
    };
  };

  return {
    bookings,
    bookingTable,
    tableRowsData,
    bookHandler,
    deleteHandler,
  };
};
