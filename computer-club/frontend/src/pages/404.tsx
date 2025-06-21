import Layout from '../components/layout';
import { Button, Card, CardText, CardTitle, NavLink, Row } from 'reactstrap';
import { Route } from '../constants/enums';
import { NextPage } from 'next';
import AppBar from '../components/app-bar/app-bar';
import { useAuthService } from '../services';

const NotFoundPage: NextPage = () => {
  const { isAuth, isAdmin, logoutHandler } = useAuthService();

  return (
    <Layout title="Страница не найдена">
      <AppBar isAuth={isAuth} isAdmin={isAdmin} logoutHandler={logoutHandler} />
      <Row>
        <Card body className="text-center">
          <CardTitle tag="h1">404</CardTitle>
          <CardText tag="p">Страница не найдена</CardText>
          <NavLink href={Route.MAIN}>
            <Button color="primary">Вернуться на главную</Button>
          </NavLink>
        </Card>
      </Row>
    </Layout>
  );
};

export default NotFoundPage;
