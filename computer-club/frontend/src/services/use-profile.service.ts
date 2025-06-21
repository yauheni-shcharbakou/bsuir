import { UserRepository } from '../repositories';
import { UserRole } from '../constants/enums';
import { ChangeEvent, useEffect, useState } from 'react';
import { User } from '../abstractions/models';

export const useProfileService = (userId?: number) => {
  const userRepository = new UserRepository();

  const [user, setUser] = useState<User | undefined>();
  const [isAdmin, setIsAdmin] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [nickname, setNickname] = useState('');

  const [isEditEmail, setIsEditEmail] = useState(false);
  const [isEditPassword, setIsEditPassword] = useState(false);
  const [isEditPhone, setIsEditPhone] = useState(false);
  const [isEditNickname, setIsEditNickname] = useState(false);

  const [isUpdateEmailBlocked, setIsUpdateEmailBlocked] = useState(true);
  const [isUpdatePasswordBlocked, setIsUpdatePasswordBlocked] = useState(true);
  const [isUpdatePhoneBlocked, setIsUpdatePhoneBlocked] = useState(true);
  const [isUpdateNicknameBlocked, setIsUpdateNicknameBlocked] = useState(true);

  useEffect(() => {
    if (userId) {
      userRepository.getById(userId).then((response: User) => setUser(() => response));
    }
  }, [userId]);

  useEffect(() => setIsUpdateEmailBlocked(() => !isEditEmail || !email), [isEditEmail, email]);
  useEffect(() => setEmail(() => (isEditEmail ? user?.email || '' : '')), [isEditEmail]);

  useEffect(() => setIsUpdatePasswordBlocked(() => !isEditPassword || !password), [isEditPassword, password]);
  useEffect(() => setPassword(() => ''), [isEditPassword]);

  useEffect(() => setIsUpdatePhoneBlocked(() => !isEditPhone || !phone), [isEditPhone, phone]);
  useEffect(() => setPhone(() => (isEditPhone ? user?.phone || '' : '')), [isEditPhone]);

  useEffect(() => setIsUpdateNicknameBlocked(() => !isEditNickname || !nickname), [isEditNickname, nickname]);
  useEffect(() => setNickname(() => (isEditNickname ? user?.nickname || '' : '')), [isEditNickname]);

  useEffect(() => setIsAdmin(() => user?.role === UserRole.ADMIN), [user]);

  const changeEmailHandler = (e: ChangeEvent<HTMLInputElement>) => setEmail(() => e.target.value);
  const changePasswordHandler = (e: ChangeEvent<HTMLInputElement>) => setPassword(() => e.target.value);
  const changePhoneHandler = (e: ChangeEvent<HTMLInputElement>) => setPhone(() => e.target.value);
  const changeNicknameHandler = (e: ChangeEvent<HTMLInputElement>) => setNickname(() => e.target.value);

  const editEmailHandler = () => setIsEditEmail(() => !isEditEmail);
  const editPasswordHandler = () => setIsEditPassword(() => !isEditPassword);
  const editPhoneHandler = () => setIsEditPhone(() => !isEditPhone);
  const editNicknameHandler = () => setIsEditNickname(() => !isEditNickname);

  const updateInfoHandler = (dtoGetter: () => Partial<User>, cleaner: () => void) => {
    return async () => {
      try {
        if (!user) return;
        const updatedUser: User = await userRepository.updateInfo(user.id, dtoGetter());
        cleaner();
        setUser(() => updatedUser);
      } catch (e) {
        console.log(e);
      }
    };
  };

  const updateEmailHandler = updateInfoHandler(
    () => ({ email }),
    () => {
      setEmail(() => '');
      setIsEditEmail(() => false);
    },
  );

  const updatePasswordHandler = updateInfoHandler(
    () => ({ password }),
    () => {
      setPassword(() => '');
      setIsEditPassword(() => false);
    },
  );

  const updatePhoneHandler = updateInfoHandler(
    () => ({ phone }),
    () => {
      setPhone(() => '');
      setIsEditPhone(() => false);
    },
  );

  const updateNicknameHandler = updateInfoHandler(
    () => ({ nickname }),
    () => {
      setNickname(() => '');
      setIsEditNickname(() => false);
    },
  );

  return {
    user,
    isAdmin,
    email,
    password,
    phone,
    nickname,
    isEditEmail,
    isEditPassword,
    isEditPhone,
    isEditNickname,
    changeEmailHandler,
    changePasswordHandler,
    changePhoneHandler,
    changeNicknameHandler,
    updateEmailHandler,
    updatePasswordHandler,
    updatePhoneHandler,
    updateNicknameHandler,
    editEmailHandler,
    editPasswordHandler,
    editPhoneHandler,
    editNicknameHandler,
    isUpdateEmailBlocked,
    isUpdatePasswordBlocked,
    isUpdatePhoneBlocked,
    isUpdateNicknameBlocked,
  };
};
