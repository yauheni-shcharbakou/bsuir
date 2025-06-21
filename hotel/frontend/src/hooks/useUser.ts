import { UserPopulated } from '../abstractions/models';
import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { userRepository } from '../repositories';
import { changeEntityById, deleteEntityById, errorHandler } from '../shared/common';
import { StoreContext } from '../store';
import { Role } from '../constants/enums';

export default function useUser(initialUsers: UserPopulated[]) {
  const { editStore } = useContext(StoreContext);

  const [users, setUsers] = useState<UserPopulated[]>(initialUsers);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<Role>(Role.CLIENT);
  const [isSubmitBlocked, setIsSubmitBlocked] = useState(true);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(
    () => setIsSubmitBlocked(!email || !email.trim() || !password || !password.trim()),
    [email, password]
  );

  const changeEmailHandler = (e: ChangeEvent<HTMLInputElement>) => setEmail(() => e.target.value);
  const changePasswordHandler = (e: ChangeEvent<HTMLInputElement>) =>
    setPassword(() => e.target.value);

  const pickUserHandler = (user: UserPopulated) => {
    editStore.setEdited(user.id);
    setEmail(() => user.email);
    setPassword(() => '');
    setRole(() => user.role);
    setIsEdit(() => true);
  };

  const clearForms = () => {
    editStore.setEdited();
    setPassword(() => '');
    setEmail(() => '');
    setRole(() => Role.CLIENT);
    setIsEdit(() => false);
  };

  const changeUserCredentialsHandler = async () => {
    try {
      const changedUser: UserPopulated = await userRepository.changeCredentials(
        editStore.getId(),
        email,
        password
      );

      setUsers(changeEntityById(users, editStore.getId(), changedUser));
      clearForms();
    } catch (e) {
      errorHandler(e);
    }
  };

  const changeUserRoleHandler = async (user: UserPopulated) => {
    try {
      const changedUser: UserPopulated = await userRepository.changeRole(
        user.id,
        user.role === Role.ADMIN ? Role.CLIENT : Role.ADMIN
      );

      setUsers(changeEntityById(users, user.id, changedUser));
      clearForms();
    } catch (e) {
      errorHandler(e);
    }
  };

  const deleteUserHandler = async (id: number) => {
    try {
      const deletedId: number = await userRepository.delete(id);
      setUsers(deleteEntityById(users, deletedId));
    } catch (e) {
      errorHandler(e);
    }
  };

  return {
    users,
    email,
    password,
    isEdit,
    isSubmitBlocked,
    pickUserHandler,
    changeEmailHandler,
    changePasswordHandler,
    changeUserCredentialsHandler,
    changeUserRoleHandler,
    deleteUserHandler,
  };
}
