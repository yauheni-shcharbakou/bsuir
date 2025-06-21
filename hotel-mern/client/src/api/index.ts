import UserApi from './user'
import ApiConfig from '../shared/ApiConfig'
import TypeApi from './type'
import BuildingApi from './building'
import ServiceApi from './service'
import RoomApi from './room'
import OrderApi from './order'
import BasketApi from './basket'
import ReviewApi from './review'

const config = new ApiConfig()

export const userApi = new UserApi(config)
export const typeApi = new TypeApi(config)
export const buildingApi = new BuildingApi(config)
export const serviceApi = new ServiceApi(config)
export const roomApi = new RoomApi(config)
export const orderApi = new OrderApi(config)
export const basketApi = new BasketApi(config)
export const reviewApi = new ReviewApi(config)
