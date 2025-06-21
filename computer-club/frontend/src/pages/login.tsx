import { NextPage } from 'next';
import Layout from '../components/layout';
import { Route, RouteTitle } from '../constants/enums';
import { Button, Card, CardLink, CardText, Col, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import { useAuthService } from '../services';
import AppBar from '../components/app-bar/app-bar';

const LoginPage: NextPage = () => {
  const {
    isAuth,
    isAdmin,
    email,
    password,
    isEmailValid,
    isPasswordValid,
    isSubmitBlocked,
    changeEmailHandler,
    changePasswordHandler,
    logoutHandler,
    submitHandler,
  } = useAuthService();

  return (
    <Layout title={RouteTitle.LOGIN}>
      <AppBar isAuth={isAuth} isAdmin={isAdmin} logoutHandler={logoutHandler} />
      <div className="container-md">
        <Card body>
          <CardText tag="h4" className="text-center">
            Авторизация
          </CardText>
          <Form>
            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label for="email">E-mail</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="E-mail"
                    value={email}
                    valid={isEmailValid}
                    required
                    autoComplete="off"
                    onInput={changeEmailHandler}
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="password">Пароль</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Пароль"
                    value={password}
                    valid={isPasswordValid}
                    required
                    autoComplete="off"
                    onInput={changePasswordHandler}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <CardText>
                  Нет аккаунта?{' '}
                  <CardLink className="link-primary" href={Route.REGISTER}>
                    Зарегистрироваться
                  </CardLink>
                </CardText>
              </Col>
              <Col md={6} className="text-end">
                <Button color="primary" disabled={isSubmitBlocked} onClick={submitHandler}>
                  Войти
                </Button>
              </Col>
            </Row>
          </Form>
        </Card>
      </div>
    </Layout>
  );
};

export default LoginPage;
