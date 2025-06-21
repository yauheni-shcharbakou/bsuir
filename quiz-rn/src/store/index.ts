import { createContext } from 'react';
import { AppStore } from '../abstractions/common';
import ModalStore from './modalStore';
import ThemeStore from './themeStore';

export const store: AppStore = {
  themeStore: new ThemeStore(),
  modalStore: new ModalStore(),
};

export const StoreContext = createContext<AppStore>(store);
