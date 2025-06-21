import { NextPage } from 'next';
import { RouteTitle } from '../../constants/enums';
import Layout from '../../components/layout';
import { Col } from 'reactstrap';
import { useAuthService, useUserService } from '../../services';
import { User } from '../../abstractions/models';
import UserCard from '../../components/cards/user-card';
import AppBar from '../../components/app-bar/app-bar';

const AdminUsersPage: NextPage = () => {
  const { isAuth, isAdmin, logoutHandler } = useAuthService();
  const { users, updateRoleHandler, deleteHandler } = useUserService();

  return (
    <Layout title={RouteTitle.ADMIN_USERS}>
      <AppBar isAuth={isAuth} isAdmin={isAdmin} logoutHandler={logoutHandler} />
      <div className="container-md">
        <h2 className="text-center pt-1">{RouteTitle.ADMIN_USERS}</h2>
        <Col className="py-2">
          {users.map((user: User) => (
            <UserCard
              key={user.id.toString()}
              user={user}
              updateRoleHandler={updateRoleHandler(user)}
              deleteHandler={deleteHandler(user.id)}
            />
          ))}
        </Col>
      </div>
    </Layout>
  );
};

export default AdminUsersPage;
