import type { NextPage } from 'next';
import Layout from '../../components/layout';
import { Col } from 'reactstrap';
import { useAuthService, useRoomService } from '../../services';
import AppBar from '../../components/app-bar/app-bar';
import { RouteTitle } from '../../constants/enums';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { RoomRepository } from '../../repositories';
import { RoomsPageProps } from '../../abstractions/props/pages';
import { RoomPopulated } from '../../abstractions/models';
import RoomCard from '../../components/cards/room-card';

export const getServerSideProps: GetServerSideProps = async (_: GetServerSidePropsContext) => {
  const initRooms = await new RoomRepository().getAll();
  return { props: { initRooms } };
};

const RoomsPage: NextPage<RoomsPageProps> = ({ initRooms }) => {
  const { isAuth, isAdmin, logoutHandler } = useAuthService();
  const { rooms } = useRoomService(initRooms);

  console.log(rooms);

  return (
    <Layout title={RouteTitle.ROOMS}>
      <AppBar isAuth={isAuth} isAdmin={isAdmin} logoutHandler={logoutHandler} />
      <div className="container-md">
        <h2 className="text-center pt-1">{RouteTitle.ROOMS}</h2>
        <Col>
          {rooms.map((room: RoomPopulated) => (
            <RoomCard key={room.id.toString()} room={room} />
          ))}
        </Col>
      </div>
    </Layout>
  );
};

export default RoomsPage;
