import { NextPage } from 'next';
import Layout from '../components/layout';
import { RouteTitle } from '../constants/enums';
import AppBar from '../components/app-bar/app-bar';
import { useAuthService, useBookingService } from '../services';
import { Col } from 'reactstrap';
import { BookingPopulated } from '../abstractions/models';
import BookingCard from '../components/cards/booking-card';

const BookingsPage: NextPage = () => {
  const { isAuth, isAdmin, logoutHandler } = useAuthService();
  const { bookings, deleteHandler } = useBookingService();

  return (
    <Layout title={RouteTitle.BOOKINGS}>
      <AppBar isAuth={isAuth} isAdmin={isAdmin} logoutHandler={logoutHandler} />
      <div className="container-md">
        <h2 className="text-center pt-1">{RouteTitle.BOOKINGS}</h2>
        <Col className="py-2">
          {bookings.map((booking: BookingPopulated) => (
            <BookingCard key={booking.id.toString()} booking={booking} deleteHandler={deleteHandler(booking.id)} />
          ))}
        </Col>
      </div>
    </Layout>
  );
};

export default BookingsPage;
