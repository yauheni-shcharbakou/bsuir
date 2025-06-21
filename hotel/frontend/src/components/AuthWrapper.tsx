import Layout from '../components/Layout';
import { Title } from '../constants/enums';
import { FC } from 'react';
import { CenteredHeader } from './styled/typography';
import { CenteredContainer } from './styled/containers';
import { useAuth } from '../hooks';
import { observer } from 'mobx-react-lite';
import { AuthWrapperProps } from '../abstractions/props';

const AuthWrapper: FC<AuthWrapperProps> = ({ children, onlyAdmin }) => {
  const { isAuth, isAdmin } = useAuth();

  if ((onlyAdmin && !isAdmin) || (!onlyAdmin && !isAuth)) {
    return (
      <Layout title={Title.UNAUTHORIZED}>
        <CenteredContainer>
          <CenteredHeader>Unauthorized</CenteredHeader>
        </CenteredContainer>
      </Layout>
    );
  }

  return <>{children}</>;
};

export default observer(AuthWrapper);
