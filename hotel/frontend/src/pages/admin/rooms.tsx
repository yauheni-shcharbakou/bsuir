import type { NextPage } from 'next';
import Layout from '../../components/Layout';
import { Title } from '../../constants/enums';
import { useRoom } from '../../hooks';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { buildingRepository, roomRepository, typeRepository } from '../../repositories';
import { RoomsPageProps } from '../../abstractions/props';
import { CenteredHeader } from '../../components/styled/typography';
import { CenteredContainer } from '../../components/styled/containers';
import { DefaultStack } from '../../components/styled/stacks';
import { RoomPopulated } from '../../abstractions/models';
import RoomForm from '../../components/forms/RoomForm';
import RoomCard from '../../components/cards/RoomCard';
import AuthWrapper from '../../components/AuthWrapper';

export const getServerSideProps: GetServerSideProps = async (_: GetServerSidePropsContext) => {
  const [initialRooms, initialBuildings, initialTypes] = await Promise.all([
    roomRepository.getAll(),
    buildingRepository.getAll(),
    typeRepository.getAll(),
  ]);
  return { props: { initialRooms, initialBuildings, initialTypes } };
};

const Rooms: NextPage<RoomsPageProps> = ({ initialRooms, initialBuildings, initialTypes }) => {
  const {
    rooms,
    building,
    type,
    isEdit,
    isSubmitBlocked,
    pickRoomHandler,
    changeBuildingHandler,
    changeTypeHandler,
    submitRoomHandler,
    deleteRoomHandler,
  } = useRoom(initialRooms);

  return (
    <AuthWrapper>
      <Layout title={Title.ROOMS}>
        <CenteredContainer>
          <CenteredHeader>Rooms</CenteredHeader>
          <RoomForm
            building={building}
            type={type}
            buildings={initialBuildings}
            types={initialTypes}
            isEdit={isEdit}
            isSubmitDisabled={isSubmitBlocked}
            onChangeBuilding={changeBuildingHandler}
            onChangeType={changeTypeHandler}
            onSubmit={submitRoomHandler}
          />
          <DefaultStack>
            {rooms.length ? (
              rooms.map((room: RoomPopulated) => (
                <RoomCard
                  key={room.id.toString(2)}
                  room={room}
                  onPick={pickRoomHandler}
                  onDelete={deleteRoomHandler}
                />
              ))
            ) : (
              <CenteredHeader variant="h6">No rooms</CenteredHeader>
            )}
          </DefaultStack>
        </CenteredContainer>
      </Layout>
    </AuthWrapper>
  );
};

export default Rooms;
