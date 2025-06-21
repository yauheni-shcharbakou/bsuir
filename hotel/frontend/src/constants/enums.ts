export enum Title {
  MAIN = 'Main',
  LOGIN = 'Login',
  REGISTER = 'Register',
  ERROR = 'Error',
  UNAUTHORIZED = 'unauthorized',
  ADMIN = 'Admin',
  BOOKINGS = 'Bookings',
  USERS = 'Users',
  BUILDINGS = 'Buildings',
  TYPES = 'Types',
  OPTIONS = 'Options',
  ROOMS = 'Rooms',
  ROOM = 'Room',
}

export enum EndPoint {
  MAIN = '/',
  ADMIN = '/admin',
  LOGIN = '/login',
  REGISTER = '/register',
  BOOKINGS = '/bookings',
  ROOM = '/room',
  ADMIN_USERS = '/admin/users',
  ADMIN_BUILDINGS = '/admin/buildings',
  ADMIN_OPTIONS = '/admin/options',
  ADMIN_TYPES = '/admin/types',
  ADMIN_ROOMS = '/admin/rooms',
}

export enum APIRoute {
  AUTH = '/auth',
  BOOKINGS = '/bookings',
  BUILDINGS = '/buildings',
  COMMENTS = '/comments',
  OPTIONS = '/options',
  ROOMS = '/rooms',
  TYPES = '/types',
  USERS = '/users',
}

export enum Role {
  ADMIN = 'admin',
  CLIENT = 'client',
}

export enum StorageKey {
  DARK_MODE = 'darkMode',
  TOKEN = 'token',
}
