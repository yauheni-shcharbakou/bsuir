import {
  BasketPopulated,
  OrderPopulated,
  RoomPopulated,
} from './populatedModels'
import { Building, Review, Service, Type, User } from './models'

export interface NavProps {
  toggleTheme(): void
}

export interface RoomInfoProps {
  room: RoomPopulated
}

export interface SelectProps {
  label?: string | number
  value?: string | number
  options: string[] | number[]
  values: string[] | number[]
  changeHandler(value: string): void
}

export interface RoomCardProps {
  room: RoomPopulated
  clickHandler(room: RoomPopulated): void
  onChange(id: string): void
  onDelete(id: string): void
  isAdmin: boolean
}

export interface RoomServiceContainerProps {
  services: Service[]
  checked: string[]
  onChange(checked: boolean, service: Service): void
}

export interface RoomPriceContainerProps {
  value: number
}

export interface RoomBookContainerProps {
  selectOptions: string[]
  selectValues: number[]
  selectValue: number
  selectHandler(value: string): void
  bookHandler(): void
}

export interface PreloaderProps {
  isDark: boolean
}

export interface OrderCardProps {
  order: OrderPopulated
  onDelete(order: OrderPopulated): void
}

export interface BasketCardProps {
  basket: BasketPopulated
  sortDate: Date
  onChangeRole(user: User): void
  onDelete(basketId: string, userId: string): void
}

export interface DatePickerProps {
  onChange(value: Date | null): void
}

export interface BuildingCardProps {
  building: Building
  onChange(building: Building): void
  onDelete(id: string): void
}

export interface ServiceCardProps {
  service: Service
  onChange(service: Service): void
  onDelete(id: string): void
}

export interface PageButtonProps {
  title: string
  path: string
}

export interface TypeCardProps {
  type: Type
  onChange(type: Type): void
  onDelete(id: string): void
}

export interface RoomCreateFormProps {
  loadRooms(): void
}

export interface ReviewCardProps {
  review: Review
  isOwner: boolean
  onChange(review: Review): void
  onDelete(id: string): void
}

export interface SpoilerProps {
  title: string
}
