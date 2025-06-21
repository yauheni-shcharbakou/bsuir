import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import { OptionRepository } from '../../repositories';
import Layout from '../../components/layout';
import { RouteTitle } from '../../constants/enums';
import { AdminOptionsPageProps } from '../../abstractions/props/pages';
import { Col } from 'reactstrap';
import { Option } from '../../abstractions/models';
import { useAuthService, useOptionService } from '../../services';
import OptionForm from '../../components/forms/option-form';
import OptionCard from '../../components/cards/option-card/option-card';
import AppBar from '../../components/app-bar/app-bar';

export const getServerSideProps: GetServerSideProps = async (_: GetServerSidePropsContext) => {
  const initOptions = await new OptionRepository().getAll();
  return { props: { initOptions } };
};

const AdminOptionsPage: NextPage<AdminOptionsPageProps> = ({ initOptions }) => {
  const { isAuth, isAdmin, logoutHandler } = useAuthService();
  const {
    name,
    description,
    price,
    isSubmitBlocked,
    options,
    isEdit,
    changeNameHandler,
    changePriceHandler,
    changeDescriptionHandler,
    pickHandler,
    submitHandler,
    deleteHandler,
  } = useOptionService(initOptions);

  return (
    <Layout title={RouteTitle.ADMIN_OPTIONS}>
      <AppBar isAuth={isAuth} isAdmin={isAdmin} logoutHandler={logoutHandler} />
      <div className="container-md">
        <Col className="py-2">
          <OptionForm
            name={name}
            description={description}
            price={price}
            isEdit={isEdit}
            isSubmitBlocked={isSubmitBlocked}
            changeNameHandler={changeNameHandler}
            changeDescriptionHandler={changeDescriptionHandler}
            changePriceHandler={changePriceHandler}
            submitHandler={submitHandler}
          />
        </Col>
        <Col className="py-2">
          {options.map((option: Option) => (
            <OptionCard
              key={option.id.toString()}
              isAdmin
              option={option}
              pickHandler={pickHandler(option)}
              deleteHandler={deleteHandler(option.id)}
            />
          ))}
        </Col>
      </div>
    </Layout>
  );
};

export default AdminOptionsPage;
