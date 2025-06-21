import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import Layout from '../../components/layout';
import { useAuthService, useComputerTypeService } from '../../services';
import { ComputerTypeRepository } from '../../repositories';
import { AdminComputerTypesPageProps } from '../../abstractions/props/pages';
import { Col } from 'reactstrap';
import { ComputerType } from '../../abstractions/models';
import ComputerTypeCard from '../../components/cards/computer-type-card';
import ComputerTypeForm from '../../components/forms/computer-type-form';
import { RouteTitle } from '../../constants/enums';
import AppBar from '../../components/app-bar/app-bar';

export const getServerSideProps: GetServerSideProps = async (_: GetServerSidePropsContext) => {
  const initComputerTypes = await new ComputerTypeRepository().getAll();
  return { props: { initComputerTypes } };
};

const AdminComputerTypesPage: NextPage<AdminComputerTypesPageProps> = ({ initComputerTypes }) => {
  const { isAuth, isAdmin, logoutHandler } = useAuthService();
  const {
    name,
    cpu,
    gpu,
    ram,
    isSubmitBlocked,
    computerTypes,
    isEdit,
    changeNameHandler,
    changeRamHandler,
    changeCpuHandler,
    changeGpuHandler,
    pickHandler,
    submitHandler,
    deleteHandler,
  } = useComputerTypeService(initComputerTypes);

  return (
    <Layout title={RouteTitle.ADMIN_COMPUTER_TYPES}>
      <AppBar isAuth={isAuth} isAdmin={isAdmin} logoutHandler={logoutHandler} />
      <div className="container-md">
        <Col className="py-2">
          <ComputerTypeForm
            name={name}
            cpu={cpu}
            gpu={gpu}
            ram={ram}
            isEdit={isEdit}
            isSubmitBlocked={isSubmitBlocked}
            changeNameHandler={changeNameHandler}
            changeRamHandler={changeRamHandler}
            changeCpuHandler={changeCpuHandler}
            changeGpuHandler={changeGpuHandler}
            submitHandler={submitHandler}
          />
        </Col>
        <Col className="py-2">
          {computerTypes.map((computerType: ComputerType) => (
            <ComputerTypeCard
              key={computerType.id.toString()}
              computerType={computerType}
              pickHandler={pickHandler(computerType)}
              deleteHandler={deleteHandler(computerType.id)}
            />
          ))}
        </Col>
      </div>
    </Layout>
  );
};

export default AdminComputerTypesPage;
