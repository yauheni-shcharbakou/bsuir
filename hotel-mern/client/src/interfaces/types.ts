import UserStore from '../store/UserStore'
import BasketStore from '../store/BasketStore'
import BuildingStore from '../store/BuildingStore'
import RoomStore from '../store/RoomStore'
import ServiceStore from '../store/ServiceStore'
import TypeStore from '../store/TypeStore'
import OrderStore from '../store/OrderStore'
import ReviewStore from '../store/ReviewStore'

export interface AppStore {
  user: UserStore
  basket: BasketStore
  building: BuildingStore
  room: RoomStore
  service: ServiceStore
  type: TypeStore
  order: OrderStore
  review: ReviewStore
}

export interface RoomRequestConfig {
  _building?: string
  _type?: string
  page: number
  limit: number
  isFree?: boolean
}
