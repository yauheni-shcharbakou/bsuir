import Layout from '../../../components/layout';
import AppBar from '../../../components/app-bar/app-bar';
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import { ComputerTypeRepository, RoomRepository } from '../../../repositories';
import { ParsedUrlQuery } from 'querystring';
import { AdminRoomPageProps } from '../../../abstractions/props/pages';
import { useAuthService, useComputerService } from '../../../services';
import { Col } from 'reactstrap';
import { ComputerPopulated } from '../../../abstractions/models';
import ComputerCard from '../../../components/cards/computer-card';
import ComputerForm from '../../../components/forms/computer-form';

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const roomRepository = new RoomRepository();
  const computerTypeRepository = new ComputerTypeRepository();
  const { id } = context.params as ParsedUrlQuery & { id: string };

  const [room, initComputers, computerTypes] = await Promise.all([
    roomRepository.getById(+id),
    roomRepository.getRoomComputers(+id),
    computerTypeRepository.getAll(),
  ]);

  return { props: { room, initComputers, computerTypes } };
};

const AdminRoomPage: NextPage<AdminRoomPageProps> = ({ room, initComputers, computerTypes }) => {
  const { isAdmin, isAuth, logoutHandler } = useAuthService();
  const {
    computers,
    isEdit,
    isSubmitBlocked,
    changeCodeHandler,
    changeTypeHandler,
    code,
    submitHandler,
    type,
    pickHandler,
    deleteHandler,
  } = useComputerService(room.id, initComputers);

  return (
    <Layout title={`Управление компьютерами помещения ${room.name}`}>
      <AppBar isAuth={isAuth} isAdmin={isAdmin} logoutHandler={logoutHandler} />
      <div className="container-md">
        <h2 className="text-center pt-1">Управление компьютерами помещения {room.name}</h2>
        <ComputerForm
          isEdit={isEdit}
          isSubmitBlocked={isSubmitBlocked}
          submitHandler={submitHandler}
          roomName={room.name}
          code={code}
          type={type}
          types={computerTypes}
          changeCodeHandler={changeCodeHandler}
          changeTypeHandler={changeTypeHandler}
        />
        <Col>
          {computers.map((computer: ComputerPopulated) => (
            <ComputerCard
              key={room.id.toString()}
              isAdmin
              computer={computer}
              pickHandler={pickHandler(computer)}
              deleteHandler={deleteHandler(computer.id)}
            />
          ))}
        </Col>
      </div>
    </Layout>
  );
};

export default AdminRoomPage;
