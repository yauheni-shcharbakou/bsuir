import type { NextPage } from 'next';
import Link from 'next/link';
import { Box, Container, Typography } from '@mui/material';
import Layout from '../components/Layout';
import { EndPoint, Title } from '../constants/enums';
import { ContainedButton } from '../components/styled/buttons';
import AuthForm from '../components/forms/AuthForm';
import { FormContainer } from '../components/styled/containers';
import { PrimaryText } from '../components/styled/typography';
import { useAuth } from '../hooks';

const Login: NextPage = () => {
  const { changePasswordHandler, changeEmailHandler, isSubmitBlocked, submitHandler } = useAuth();

  return (
    <Layout title={Title.LOGIN}>
      <Container>
        <Box component="form" noValidate autoComplete="off" className="form">
          <AuthForm
            title="Login"
            changeEmailHandler={changeEmailHandler}
            changePasswordHandler={changePasswordHandler}
          />
          <FormContainer large>
            <Typography component="div">
              Dont have account?{' '}
              <PrimaryText>
                <Link href={EndPoint.REGISTER}>Register</Link>
              </PrimaryText>
            </Typography>
            <ContainedButton primary onClick={submitHandler} disabled={isSubmitBlocked}>
              Login
            </ContainedButton>
          </FormContainer>
        </Box>
      </Container>
    </Layout>
  );
};

export default Login;
