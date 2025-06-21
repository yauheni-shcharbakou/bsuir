import { Route } from './enums';

export const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

export const SINGLETON_KEY = Symbol();
export const DEFAULT_EDITED_ID = -1;

export const ADMIN_ROUTES: string[] = [
  Route.ADMIN,
  Route.ADMIN_COMPUTER_TYPES,
  Route.ADMIN_ROOM_TYPES,
  Route.ADMIN_OPTIONS,
  Route.ADMIN_EVENTS,
  Route.ADMIN_USERS,
  Route.ADMIN_ROOMS,
];

export const PUBLIC_ROUTES: string[] = [Route.LOGIN, Route.REGISTER];
