import { RoomPopulated } from './populatedModels'
import { User } from './models'

export interface RoomResponse {
  rooms: RoomPopulated[]
  amount: number
}

export interface UserResponse {
  token: string
  id: string
}

export interface ConvertedUserResponse {
  user: User
  id: string
}

export interface ErrorResponse {
  response?: {
    data?: {
      message?: string
    }
  }
}
