import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import Layout from '../../components/layout';
import { RoomTypeRepository } from '../../repositories';
import { AdminRoomTypesPageProps } from '../../abstractions/props/pages';
import { Col } from 'reactstrap';
import { RoomType } from '../../abstractions/models';
import RoomTypeForm from '../../components/forms/room-type-form';
import { useAuthService, useRoomTypeService } from '../../services';
import RoomTypeCard from '../../components/cards/room-type-card';
import { RouteTitle } from '../../constants/enums';
import AppBar from '../../components/app-bar/app-bar';

export const getServerSideProps: GetServerSideProps = async (_: GetServerSidePropsContext) => {
  const initRoomTypes = await new RoomTypeRepository().getAll();
  return { props: { initRoomTypes } };
};

const AdminRoomTypesPage: NextPage<AdminRoomTypesPageProps> = ({ initRoomTypes }) => {
  const { isAuth, isAdmin, logoutHandler } = useAuthService();
  const {
    name,
    places,
    price,
    isSubmitBlocked,
    roomTypes,
    isEdit,
    changeNameHandler,
    changePriceHandler,
    changePlacesHandler,
    pickHandler,
    submitHandler,
    deleteHandler,
  } = useRoomTypeService(initRoomTypes);

  return (
    <Layout title={RouteTitle.ADMIN_ROOM_TYPES}>
      <AppBar isAuth={isAuth} isAdmin={isAdmin} logoutHandler={logoutHandler} />
      <div className="container-md">
        <Col className="py-2">
          <RoomTypeForm
            name={name}
            places={places}
            price={price}
            isEdit={isEdit}
            isSubmitBlocked={isSubmitBlocked}
            changeNameHandler={changeNameHandler}
            changePlacesHandler={changePlacesHandler}
            changePriceHandler={changePriceHandler}
            submitHandler={submitHandler}
          />
        </Col>
        <Col className="py-2">
          {roomTypes.map((roomType: RoomType) => (
            <RoomTypeCard
              key={roomType.id.toString()}
              roomType={roomType}
              pickHandler={pickHandler(roomType)}
              deleteHandler={deleteHandler(roomType.id)}
            />
          ))}
        </Col>
      </div>
    </Layout>
  );
};

export default AdminRoomTypesPage;
