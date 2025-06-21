import type { NextPage } from 'next';
import Layout from '../components/Layout';
import { Title } from '../constants/enums';
import { CenteredHeader } from '../components/styled/typography';
import { CenteredContainer } from '../components/styled/containers';
import { OutlinedButton } from '../components/styled/buttons';
import { RouteLink } from '../components/styled/common';
import { DefaultStack } from '../components/styled/stacks';
import { ADMIN_BUTTONS } from '../constants/common';
import AuthWrapper from '../components/AuthWrapper';

const Admin: NextPage = () => {
  return (
    <AuthWrapper>
      <Layout title={Title.ADMIN}>
        <CenteredContainer>
          <CenteredHeader>Admin panel</CenteredHeader>
          <DefaultStack>
            {ADMIN_BUTTONS.map(({ path, title }) => (
              <RouteLink href={path} key={path}>
                <OutlinedButton fullWidth primary>
                  {title}
                </OutlinedButton>
              </RouteLink>
            ))}
          </DefaultStack>
        </CenteredContainer>
      </Layout>
    </AuthWrapper>
  );
};

export default Admin;
