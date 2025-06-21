import type { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import { observer } from 'mobx-react-lite';
import Layout from '../../components/Layout';
import { Title } from '../../constants/enums';
import { userRepository } from '../../repositories';
import { UsersPageProps } from '../../abstractions/props';
import { useAuth, useUser } from '../../hooks';
import { DefaultStack } from '../../components/styled/stacks';
import { UserPopulated } from '../../abstractions/models';
import UserCard from '../../components/cards/UserCard';
import { CenteredContainer } from '../../components/styled/containers';
import { CenteredHeader } from '../../components/styled/typography';
import UserForm from '../../components/forms/UserForm';
import AuthWrapper from '../../components/AuthWrapper';

export const getServerSideProps: GetServerSideProps = async (_: GetServerSidePropsContext) => {
  const initialUsers = await userRepository.getAll();
  return { props: { initialUsers } };
};

const Users: NextPage<UsersPageProps> = ({ initialUsers }) => {
  const { userEmail } = useAuth();
  const {
    users,
    email,
    password,
    isEdit,
    isSubmitBlocked,
    changeEmailHandler,
    changePasswordHandler,
    changeUserRoleHandler,
    pickUserHandler,
    deleteUserHandler,
    changeUserCredentialsHandler,
  } = useUser(initialUsers);

  return (
    <AuthWrapper>
      <Layout title={Title.USERS}>
        <CenteredContainer>
          <CenteredHeader>Users</CenteredHeader>
          <UserForm
            email={email}
            password={password}
            isEdit={isEdit}
            isSubmitDisabled={isSubmitBlocked}
            onChangeEmail={changeEmailHandler}
            onChangePassword={changePasswordHandler}
            onSubmit={changeUserCredentialsHandler}
          />
          <DefaultStack>
            {users.length ? (
              users.map((user: UserPopulated) => (
                <UserCard
                  key={user.id}
                  user={user}
                  selfEmail={userEmail}
                  onChangeRole={changeUserRoleHandler}
                  onPick={pickUserHandler}
                  onDelete={deleteUserHandler}
                />
              ))
            ) : (
              <CenteredHeader variant="h6">No users</CenteredHeader>
            )}
          </DefaultStack>
        </CenteredContainer>
      </Layout>
    </AuthWrapper>
  );
};

export default observer(Users);
