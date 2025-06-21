import { User } from '../abstractions/models';
import { UserRepository } from '../repositories';
import { ChangeEvent, useEffect, useState } from 'react';
import { UserRole } from '../constants/enums';

export const useUserService = () => {
  const userRepository = new UserRepository();

  const [users, setUsers] = useState<User[]>([]);
  const [isSubmitBlocked, setIsSubmitBlocked] = useState(true);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [nickname, setNickname] = useState('');

  useEffect(() => {
    userRepository.getAll().then((response: User[]) => setUsers(() => response));
  }, []);

  useEffect(() => setIsSubmitBlocked(() => !email || !password), [email, password]);

  const changeEmailHandler = (e: ChangeEvent<HTMLInputElement>) => setEmail(() => e.target.value);
  const changePasswordHandler = (e: ChangeEvent<HTMLInputElement>) => setPassword(() => e.target.value);
  const changePhoneHandler = (e: ChangeEvent<HTMLInputElement>) => setPhone(() => e.target.value);
  const changeNicknameHandler = (e: ChangeEvent<HTMLInputElement>) => setNickname(() => e.target.value);

  const clearForms = () => {
    setEmail(() => '');
    setPassword(() => '');
    setNickname(() => '');
    setPhone(() => '');
  };

  const updateRoleHandler = (user: User) => {
    return async () => {
      try {
        const newRole: UserRole = user.role === UserRole.CLIENT ? UserRole.ADMIN : UserRole.CLIENT;
        const updatedUser: User = await userRepository.updateRole(user.id, newRole);

        setUsers(() => users.map((u: User) => (u.id === updatedUser.id ? updatedUser : u)));
      } catch (e) {
        console.log(e);
      }
    };
  };

  const updateInfoHandler = (user: User) => {
    return async () => {
      try {
        const userDto: Partial<User> = { email, password, nickname, phone };
        const updatedUser: User = await userRepository.updateInfo(user.id, userDto);

        clearForms();
        setUsers(() => users.map((u: User) => (u.id === updatedUser.id ? updatedUser : u)));
      } catch (e) {
        console.log(e);
      }
    };
  };

  const deleteHandler = (id: number) => {
    return async () => {
      try {
        const deletedId: number = await userRepository.delete(id);
        setUsers(() => users.filter(({ id: existsId }) => existsId !== deletedId));
      } catch (e) {
        console.log(e);
      }
    };
  };

  return {
    users,
    isSubmitBlocked,
    email,
    password,
    phone,
    nickname,
    changeEmailHandler,
    changePasswordHandler,
    changePhoneHandler,
    changeNicknameHandler,
    updateInfoHandler,
    updateRoleHandler,
    deleteHandler,
  };
};
