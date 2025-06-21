import { useContext, useEffect, useState } from 'react';
import { ModalName } from '../shared/enums';
import { StoreContext } from '../store';

export const useModal = () => {
  const { modalStore } = useContext(StoreContext);

  const [isOpened, setIsOpened] = useState(modalStore.isOpened);
  const [modalName, setModalName] = useState<ModalName>(modalStore.getName());

  useEffect(() => setIsOpened(() => modalStore.isOpened), [modalStore.isOpened]);

  const openModal = (name: ModalName) => {
    return () => {
      modalStore.setName(name);
      setModalName(name);
      modalStore.toggle();
    };
  };

  const closeModal = () => modalStore.toggle();

  return { isOpened, modalName, openModal, closeModal };
};
