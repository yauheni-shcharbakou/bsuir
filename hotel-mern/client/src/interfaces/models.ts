import { roles } from '../shared/enums'

export interface User {
  _id?: string
  email: string
  role: roles
}

export interface Basket {
  _id: string
  _user: string
  _orders: string[]
}

export interface Building {
  _id: string
  address: string
  _rooms: string[]
}

export interface Room {
  _id: string
  _building: string
  _type: string
  _order: string
  isFree: boolean
  population: number
}

export interface Order {
  _id: string
  _basket: string
  _room: string
  _services: string[]
  duty: number
  date: string
  population: number
}

export interface Service {
  _id: string
  name: string
  price: number
}

export interface Type {
  _id: string
  _services: string[]
  name: string
  places: number
}

export interface Review {
  _id: string
  _room: string
  author: string
  content: string
}
