import { NextPage } from 'next';
import Layout from '../components/layout';
import { Route, RouteTitle } from '../constants/enums';
import { Button, Card, CardLink, CardText, Col, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import { useAuthService } from '../services';
import AppBar from '../components/app-bar/app-bar';

const RegisterPage: NextPage = () => {
  const {
    isAuth,
    isAdmin,
    email,
    password,
    phone,
    nickname,
    isEmailValid,
    isPasswordValid,
    isSubmitBlocked,
    changeEmailHandler,
    changePasswordHandler,
    changePhoneHandler,
    changeNicknameHandler,
    submitHandler,
    logoutHandler,
  } = useAuthService();

  return (
    <Layout title={RouteTitle.REGISTER}>
      <AppBar isAuth={isAuth} isAdmin={isAdmin} logoutHandler={logoutHandler} />
      <div className="container-md">
        <Card body>
          <CardText tag="h4" className="text-center">
            Регистрация
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
                <FormGroup>
                  <Label for="phone">Телефон</Label>
                  <Input
                    id="phone"
                    type="text"
                    placeholder="Телефон"
                    value={phone}
                    autoComplete="off"
                    onInput={changePhoneHandler}
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="nickname">Никнейм</Label>
                  <Input
                    id="nickname"
                    type="text"
                    placeholder="Никнейм"
                    value={nickname}
                    autoComplete="off"
                    onInput={changeNicknameHandler}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <CardText>
                  Уже есть аккаунт?{' '}
                  <CardLink className="link-primary" href={Route.LOGIN}>
                    Войти
                  </CardLink>
                </CardText>
              </Col>
              <Col md={6} className="text-end">
                <Button color="primary" disabled={isSubmitBlocked} onClick={submitHandler}>
                  Зарегистрироваться
                </Button>
              </Col>
            </Row>
          </Form>
        </Card>
      </div>
    </Layout>
  );
};

export default RegisterPage;
