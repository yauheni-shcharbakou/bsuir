import { createContext } from 'react';
import { IStore } from '../abstractions/interfaces';
import BuildingStore from './BuildingStore';
import TypeStore from './TypeStore';
import AuthStore from './AuthStore';
import EditStore from './EditStore';

export const store: IStore = {
  editStore: new EditStore(),
  authStore: new AuthStore(),
  buildingStore: new BuildingStore(),
  typeStore: new TypeStore(),
};

export const StoreContext = createContext<IStore>(store);
