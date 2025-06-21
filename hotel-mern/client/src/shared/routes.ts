import { AdminPage } from '../pages/AdminPage'
import { UserPage } from '../pages/UserPage'
import { RoomPage } from '../pages/RoomPage'
import { MainPage } from '../pages/MainPage'
import { AuthPage } from '../pages/AuthPage'
import { BuildingPage } from '../pages/BuildingPage'
import { ServicePage } from '../pages/ServicePage'
import { TypePage } from '../pages/TypePage'
import { paths } from './enums'

export const authRoutes = [
  {
    path: paths.admin,
    component: AdminPage,
  },
  {
    path: paths.user,
    component: UserPage,
  },
  {
    path: paths.building,
    component: BuildingPage,
  },
  {
    path: paths.service,
    component: ServicePage,
  },
  {
    path: paths.type,
    component: TypePage,
  },
]

export const publicRoutes = [
  {
    path: paths.main,
    component: MainPage,
  },
  {
    path: paths.register,
    component: AuthPage,
  },
  {
    path: paths.login,
    component: AuthPage,
  },
  {
    path: `${paths.room}/:id`,
    component: RoomPage,
  },
]
