import { User } from '../abstractions/models';
import { Route, StorageKey, UserRole } from '../constants/enums';
import { AuthRepository } from '../repositories';
import { ChangeEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { ADMIN_ROUTES } from '../constants/common';

export function useAuthService() {
  const authRepository = new AuthRepository();

  const { pathname, push } = useRouter();

  const [user, setUser] = useState<User | undefined>();
  const [userId, setUserId] = useState<number | undefined>();
  const [isAuth, setIsAuth] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isSubmitBlocked, setIsSubmitBlocked] = useState(true);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [nickname, setNickname] = useState('');

  const refreshToken = () => {
    const savedToken: string | null = localStorage.getItem(StorageKey.TOKEN);

    if (savedToken) {
      new AuthRepository()
        .updateToken()
        .then((response: User) => {
          setUser(() => response);

          if (
            response.role !== UserRole.ADMIN &&
            (ADMIN_ROUTES.includes(pathname) || pathname.includes(`${Route.ADMIN_ROOMS}/`))
          ) {
            push(Route.MAIN).then();
          }
        })
        .catch(() => {
          localStorage.removeItem(StorageKey.TOKEN);
          push(Route.LOGIN).then();
        });
    }

    if (pathname !== Route.REGISTER && !savedToken) {
      push(Route.LOGIN).then();
    }
  };

  useEffect(refreshToken, []);

  useEffect(() => {
    setIsAuth(() => !!user);
    setIsAdmin(() => user?.role === UserRole.ADMIN);
    setUserId(() => user?.id);
  }, [user]);

  useEffect(() => {
    if (ADMIN_ROUTES.includes(pathname) && isAuth && !isAdmin) {
      push(Route.MAIN).then();
    }
  }, [isAuth, isAdmin]);

  useEffect(() => setIsEmailValid(() => !!email), [email]);
  useEffect(() => setIsPasswordValid(() => !!password && password.length >= 5), [password]);
  useEffect(() => setIsSubmitBlocked(() => !email || !(password && password.length >= 5)), [email, password]);

  const submitHandler = async () => {
    try {
      const user: User =
        pathname === Route.LOGIN
          ? await authRepository.login(email, password)
          : await authRepository.register({ email, password, nickname, phone });

      setUser(() => user);
      await push(Route.MAIN);
    } catch (e) {
      alert(e);
    }
  };

  const changeEmailHandler = (e: ChangeEvent<HTMLInputElement>) => setEmail(() => e.target.value);
  const changePasswordHandler = (e: ChangeEvent<HTMLInputElement>) => setPassword(() => e.target.value);
  const changePhoneHandler = (e: ChangeEvent<HTMLInputElement>) => setPhone(() => e.target.value);
  const changeNicknameHandler = (e: ChangeEvent<HTMLInputElement>) => setNickname(() => e.target.value);

  const logoutHandler = async () => {
    setUser(() => undefined);
    localStorage.removeItem(StorageKey.TOKEN);
    await push(Route.LOGIN);
  };

  return {
    isAuth,
    isAdmin,
    isEmailValid,
    isPasswordValid,
    isSubmitBlocked,
    userId,
    email,
    password,
    phone,
    nickname,
    submitHandler,
    logoutHandler,
    changeEmailHandler,
    changePasswordHandler,
    changeNicknameHandler,
    changePhoneHandler,
  };
}
