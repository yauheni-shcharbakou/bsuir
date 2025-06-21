import type { NextPage } from 'next';
import Layout from '../components/layout';
import { Col } from 'reactstrap';
import { RouteTitle } from '../constants/enums';
import { useAuthService, useOptionService } from '../services';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { OptionRepository } from '../repositories';
import { OptionsPageProps } from '../abstractions/props/pages';
import { Option } from '../abstractions/models';
import OptionCard from '../components/cards/option-card/option-card';
import AppBar from '../components/app-bar/app-bar';

export const getServerSideProps: GetServerSideProps = async (_: GetServerSidePropsContext) => {
  const initOptions = await new OptionRepository().getAll();
  return { props: { initOptions } };
};

const OptionsPage: NextPage<OptionsPageProps> = ({ initOptions }) => {
  const { isAuth, isAdmin, logoutHandler } = useAuthService();
  const { options } = useOptionService(initOptions);

  return (
    <Layout title={RouteTitle.OPTIONS}>
      <AppBar isAuth={isAuth} isAdmin={isAdmin} logoutHandler={logoutHandler} />
      <div className="container-md">
        <h2 className="text-center pt-1">{RouteTitle.OPTIONS}</h2>
        <Col>
          {options.map((option: Option) => (
            <OptionCard key={option.id.toString()} option={option} />
          ))}
        </Col>
      </div>
    </Layout>
  );
};

export default OptionsPage;
