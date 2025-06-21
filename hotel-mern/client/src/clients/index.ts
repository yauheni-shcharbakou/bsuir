import TypeClient from './TypeClient'
import {
  basketApi,
  buildingApi,
  orderApi,
  reviewApi,
  roomApi,
  serviceApi,
  typeApi,
  userApi,
} from '../api'
import BuildingClient from './BuildingClient'
import RoomClient from './RoomClient'
import ServiceClient from './ServiceClient'
import UserClient from './UserClient'
import BasketClient from './BasketClient'
import OrderClient from './OrderClient'
import ReviewClient from './ReviewClient'

export const typeClient = new TypeClient(typeApi)
export const buildingClient = new BuildingClient(buildingApi)
export const roomClient = new RoomClient(roomApi)
export const serviceClient = new ServiceClient(serviceApi)
export const userClient = new UserClient(userApi)
export const basketClient = new BasketClient(basketApi)
export const orderClient = new OrderClient(orderApi)
export const reviewClient = new ReviewClient(reviewApi)
