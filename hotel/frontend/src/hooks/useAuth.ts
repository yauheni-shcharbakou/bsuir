import { useRouter } from 'next/router';
import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { EndPoint, StorageKey } from '../constants/enums';
import { StoreContext } from '../store';
import { TokenModel } from '../abstractions/models';
import { authRepository } from '../repositories';
import { errorHandler } from '../shared/common';

export default function useAuth() {
  const { push, pathname } = useRouter();
  const { authStore } = useContext(StoreContext);

  const [isAuth, setIsAuth] = useState(authStore.getIsAuth());
  const [isAdmin, setIsAdmin] = useState(authStore.isAdmin());
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitBlocked, setIsSubmitBlocked] = useState(true);
  const [userEmail, setUserEmail] = useState('');

  const authorize = () => {
    const savedToken: string | null = localStorage.getItem(StorageKey.TOKEN);

    if (savedToken) {
      authRepository
        .auth()
        .then((userData: TokenModel) => {
          authStore.setUserData(userData);
          authStore.setIsAuth(true);
          setUserEmail(() => userData.email);
        })
        .catch(() => {});
    }
  };

  useEffect(authorize, []);
  useEffect(() => setIsAuth(() => authStore.isAuth), [authStore.isAuth]);
  useEffect(() => setIsAdmin(() => authStore.isAdminObserved), [authStore.isAdminObserved]);
  useEffect(() => setIsSubmitBlocked(() => !email || !password), [email, password]);

  const submitHandler = async () => {
    try {
      const tokenData: TokenModel =
        pathname === EndPoint.REGISTER
          ? await authRepository.register(email, password)
          : await authRepository.login(email, password);

      authStore.setUserData(tokenData);
      authStore.setIsAuth(true);
      setUserEmail(() => tokenData.email);

      await push(EndPoint.MAIN);
    } catch (e) {
      errorHandler(e);
    }
  };

  const changeEmailHandler = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
  const changePasswordHandler = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

  const logoutHandler = () => {
    authStore.setUserData();
    authStore.setIsAuth(false);
    setUserEmail(() => '');
    localStorage.removeItem(StorageKey.TOKEN);
    push(EndPoint.MAIN).then();
  };

  return {
    logoutHandler,
    submitHandler,
    changeEmailHandler,
    changePasswordHandler,
    isAuth,
    isAdmin,
    isSubmitBlocked,
    userEmail,
  };
}
