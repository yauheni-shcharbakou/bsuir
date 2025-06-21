import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import Layout from '../../components/layout';
import { RouteTitle } from '../../constants/enums';
import { AdminEventsPageProps } from '../../abstractions/props/pages';
import { EventRepository } from '../../repositories';
import { Col } from 'reactstrap';
import { Event } from '../../abstractions/models';
import { useAuthService, useEventService } from '../../services';
import EventForm from '../../components/forms/event-form';
import EventCard from '../../components/cards/event-card';
import AppBar from '../../components/app-bar/app-bar';

export const getServerSideProps: GetServerSideProps = async (_: GetServerSidePropsContext) => {
  const initEvents = await new EventRepository().getAll();
  return { props: { initEvents } };
};

const AdminEventsPage: NextPage<AdminEventsPageProps> = ({ initEvents }) => {
  const { isAuth, isAdmin, logoutHandler } = useAuthService();
  const {
    name,
    date,
    isSubmitBlocked,
    events,
    isEdit,
    changeNameHandler,
    changeDateHandler,
    pickHandler,
    submitHandler,
    deleteHandler,
  } = useEventService(initEvents);

  return (
    <Layout title={RouteTitle.ADMIN_EVENTS}>
      <AppBar isAuth={isAuth} isAdmin={isAdmin} logoutHandler={logoutHandler} />
      <div className="container-md">
        <Col className="py-2">
          <EventForm
            name={name}
            date={date}
            isEdit={isEdit}
            isSubmitBlocked={isSubmitBlocked}
            changeNameHandler={changeNameHandler}
            changeDateHandler={changeDateHandler}
            submitHandler={submitHandler}
          />
        </Col>
        <Col className="py-2">
          {events.map((event: Event) => (
            <EventCard
              key={event.id.toString()}
              isAdmin
              event={event}
              pickHandler={pickHandler(event)}
              deleteHandler={deleteHandler(event.id)}
            />
          ))}
        </Col>
      </div>
    </Layout>
  );
};

export default AdminEventsPage;
