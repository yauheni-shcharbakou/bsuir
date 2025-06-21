import { createContext } from 'react'
import { AppStore } from '../interfaces/types'
import UserStore from './UserStore'
import BasketStore from './BasketStore'
import BuildingStore from './BuildingStore'
import OrderStore from './OrderStore'
import RoomStore from './RoomStore'
import ServiceStore from './ServiceStore'
import TypeStore from './TypeStore'
import ReviewStore from './ReviewStore'

export const store = {
  user: new UserStore(),
  basket: new BasketStore(),
  building: new BuildingStore(),
  order: new OrderStore(),
  room: new RoomStore(),
  service: new ServiceStore(),
  type: new TypeStore(),
  review: new ReviewStore(),
}

export const Context = createContext<AppStore>({} as AppStore)
