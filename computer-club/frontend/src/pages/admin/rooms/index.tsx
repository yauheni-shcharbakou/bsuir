import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import Layout from '../../../components/layout';
import { RoomRepository, RoomTypeRepository } from '../../../repositories';
import { AdminRoomsPageProps } from '../../../abstractions/props/pages';
import { Col } from 'reactstrap';
import { RoomPopulated } from '../../../abstractions/models';
import { useAuthService, useRoomService } from '../../../services';
import { RouteTitle } from '../../../constants/enums';
import RoomCard from '../../../components/cards/room-card';
import RoomForm from '../../../components/forms/room-form';
import AppBar from '../../../components/app-bar/app-bar';

export const getServerSideProps: GetServerSideProps = async (_: GetServerSidePropsContext) => {
  const [initRoomTypes, initRooms] = await Promise.all([
    new RoomTypeRepository().getAll(),
    new RoomRepository().getAll(),
  ]);

  return { props: { initRoomTypes, initRooms } };
};

const AdminRoomsPage: NextPage<AdminRoomsPageProps> = ({ initRoomTypes, initRooms }) => {
  const { isAuth, isAdmin, logoutHandler } = useAuthService();
  const {
    name,
    type,
    isSubmitBlocked,
    rooms,
    isEdit,
    changeNameHandler,
    changeTypeHandler,
    pickHandler,
    submitHandler,
    deleteHandler,
  } = useRoomService(initRooms);

  return (
    <Layout title={RouteTitle.ADMIN_ROOMS}>
      <AppBar isAuth={isAuth} isAdmin={isAdmin} logoutHandler={logoutHandler} />
      <div className="container-md">
        <Col className="py-2">
          <RoomForm
            name={name}
            type={type}
            types={initRoomTypes}
            isEdit={isEdit}
            isSubmitBlocked={isSubmitBlocked}
            changeNameHandler={changeNameHandler}
            changeTypeHandler={changeTypeHandler}
            submitHandler={submitHandler}
          />
        </Col>
        <Col className="py-2">
          {rooms.map((room: RoomPopulated) => (
            <RoomCard
              key={room.id.toString()}
              room={room}
              isAdmin
              pickHandler={pickHandler(room)}
              deleteHandler={deleteHandler(room.id)}
            />
          ))}
        </Col>
      </div>
    </Layout>
  );
};

export default AdminRoomsPage;
