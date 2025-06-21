import { Building, Order, Room, Service, Type, User } from './models'

export interface RoomPopulated {
  _id: string
  _building: Building
  _type: Type
  _order?: string
  isFree: boolean
  population: number
}

export interface BasketPopulated {
  _id: string
  _user: User
  _orders: Order[]
}

export interface OrderPopulated {
  _id: string
  _basket: string
  _room: Room
  _services: Service[]
  duty: number
  date: string
  population: number
}
