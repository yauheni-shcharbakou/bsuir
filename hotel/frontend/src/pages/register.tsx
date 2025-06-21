import type { NextPage } from 'next';
import Link from 'next/link';
import { Box, Container, Typography } from '@mui/material';
import Layout from '../components/Layout';
import { EndPoint, Title } from '../constants/enums';
import { ContainedButton } from '../components/styled/buttons';
import { FormContainer } from '../components/styled/containers';
import { PrimaryText } from '../components/styled/typography';
import AuthForm from '../components/forms/AuthForm';
import { useAuth } from '../hooks';

const Register: NextPage = () => {
  const { changePasswordHandler, changeEmailHandler, isSubmitBlocked, submitHandler } = useAuth();

  return (
    <Layout title={Title.REGISTER}>
      <Container>
        <Box component="form" noValidate autoComplete="off" className="form">
          <AuthForm
            title="Register"
            changeEmailHandler={changeEmailHandler}
            changePasswordHandler={changePasswordHandler}
          />
          <FormContainer large>
            <Typography component="div">
              Already have account?{' '}
              <PrimaryText>
                <Link href={EndPoint.LOGIN}>Login</Link>
              </PrimaryText>
            </Typography>
            <ContainedButton primary onClick={submitHandler} disabled={isSubmitBlocked}>
              Register
            </ContainedButton>
          </FormContainer>
        </Box>
      </Container>
    </Layout>
  );
};

export default Register;
