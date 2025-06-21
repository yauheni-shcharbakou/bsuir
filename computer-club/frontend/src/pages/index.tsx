import type { NextPage } from 'next';
import Layout from '../components/layout';
import { Col } from 'reactstrap';
import { RouteTitle } from '../constants/enums';
import { useAuthService, useProfileService } from '../services';
import ProfileInfoCard from '../components/cards/profile-info-card';
import ProfileItemForm from '../components/forms/profile-item-form';
import AppBar from '../components/app-bar/app-bar';

const IndexPage: NextPage = () => {
  const { userId, isAdmin, isAuth, logoutHandler } = useAuthService();
  const {
    user,
    password,
    phone,
    nickname,
    email,
    editEmailHandler,
    editNicknameHandler,
    editPhoneHandler,
    editPasswordHandler,
    changePasswordHandler,
    changeNicknameHandler,
    changePhoneHandler,
    updateNicknameHandler,
    updatePhoneHandler,
    updatePasswordHandler,
    changeEmailHandler,
    updateEmailHandler,
    isEditEmail,
    isEditNickname,
    isUpdateNicknameBlocked,
    isUpdatePasswordBlocked,
    isUpdatePhoneBlocked,
    isEditPhone,
    isEditPassword,
    isUpdateEmailBlocked,
  } = useProfileService(userId);

  return (
    <Layout title={RouteTitle.MAIN}>
      <AppBar isAuth={isAuth} isAdmin={isAdmin} logoutHandler={logoutHandler} />
      <div className="container-md">
        <Col className="py-2">
          <ProfileInfoCard user={user} isAdmin={isAdmin} />
        </Col>
        <Col className="py-2">
          <ProfileItemForm
            title="E-mail"
            value={email}
            placeholder="Введите E-mail"
            isEdit={isEditEmail}
            isSubmitBlocked={isUpdateEmailBlocked}
            editHandler={editEmailHandler}
            inputHandler={changeEmailHandler}
            submitHandler={updateEmailHandler}
          />
          <ProfileItemForm
            title="Пароль"
            value={password}
            placeholder="Введите пароль"
            isEdit={isEditPassword}
            isSubmitBlocked={isUpdatePasswordBlocked}
            editHandler={editPasswordHandler}
            inputHandler={changePasswordHandler}
            submitHandler={updatePasswordHandler}
          />
          <ProfileItemForm
            title="Телефон"
            value={phone}
            placeholder="Введите телефон"
            isEdit={isEditPhone}
            isSubmitBlocked={isUpdatePhoneBlocked}
            editHandler={editPhoneHandler}
            inputHandler={changePhoneHandler}
            submitHandler={updatePhoneHandler}
          />
          <ProfileItemForm
            title="Никнейм"
            value={nickname}
            placeholder="Введите никнейм"
            isEdit={isEditNickname}
            isSubmitBlocked={isUpdateNicknameBlocked}
            editHandler={editNicknameHandler}
            inputHandler={changeNicknameHandler}
            submitHandler={updateNicknameHandler}
          />
        </Col>
      </div>
    </Layout>
  );
};

export default IndexPage;
