import { NextPage } from 'next';
import Layout from '../../components/layout';
import { ListGroup, ListGroupItem, NavLink } from 'reactstrap';
import { NAV_ADMIN_ROUTES } from '../../constants/ui';
import { useAuthService } from '../../services';
import AppBar from '../../components/app-bar/app-bar';

const AdminPage: NextPage = () => {
  const { isAuth, isAdmin, logoutHandler } = useAuthService();

  return (
    <Layout title="Администрирование">
      <AppBar isAuth={isAuth} isAdmin={isAdmin} logoutHandler={logoutHandler} />
      <ListGroup>
        {NAV_ADMIN_ROUTES.map(({ title, link }) => (
          <ListGroupItem key={link} action>
            <NavLink href={link}>{title}</NavLink>
          </ListGroupItem>
        ))}
      </ListGroup>
    </Layout>
  );
};

export default AdminPage;
