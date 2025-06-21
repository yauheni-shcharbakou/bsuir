import type { NextPage } from 'next';
import Layout from '../components/layout';
import { RouteTitle } from '../constants/enums';
import { Col } from 'reactstrap';
import { useAuthService, useEventService } from '../services';
import EventCard from '../components/cards/event-card';
import { Event } from '../abstractions/models';
import AppBar from '../components/app-bar/app-bar';

const EventsPage: NextPage = () => {
  const { isAuth, isAdmin, logoutHandler } = useAuthService();
  const { events, readHandler } = useEventService([]);

  return (
    <Layout title={RouteTitle.EVENTS}>
      <AppBar isAuth={isAuth} isAdmin={isAdmin} logoutHandler={logoutHandler} />
      <div className="container-md">
        <h2 className="text-center pt-1">{RouteTitle.EVENTS}</h2>
        <Col className="py-2">
          {events.map((event: Event) => (
            <EventCard key={event.id.toString()} event={event} readHandler={readHandler(event.id)} />
          ))}
        </Col>
      </div>
    </Layout>
  );
};

export default EventsPage;
