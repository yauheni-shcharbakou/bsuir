export enum Route {
  ADMIN = '/admin',
  ROOMS = '/rooms',
  OPTIONS = '/options',
  ORDERS = '/orders',
  EVENTS = '/events',
  COMPUTERS = '/computers',
  BOOKINGS = '/bookings',
  MAIN = '/',
  LOGIN = '/login',
  REGISTER = '/register',
  ADMIN_COMPUTER_TYPES = '/admin/computer-types',
  ADMIN_ROOM_TYPES = '/admin/room-types',
  ADMIN_OPTIONS = '/admin/options',
  ADMIN_EVENTS = '/admin/events',
  ADMIN_USERS = '/admin/users',
  ADMIN_ROOMS = '/admin/rooms',
}

export enum RouteTitle {
  MAIN = 'Аккаунт',
  ADMIN = 'Администрирование',
  ROOMS = 'Помещения',
  OPTIONS = 'Услуги',
  ORDERS = 'История заказов',
  EVENTS = 'Мероприятия',
  BOOKINGS = 'Бронь',
  LOGIN = 'Вход',
  REGISTER = 'Регистрация',
  ADMIN_COMPUTER_TYPES = 'Управление типами компьютеров',
  ADMIN_ROOM_TYPES = 'Управление типами помещений',
  ADMIN_OPTIONS = 'Управление услугами',
  ADMIN_EVENTS = 'Управление мероприятиями',
  ADMIN_USERS = 'Управление пользователями',
  ADMIN_ROOMS = 'Управление помещениями',
}

export enum StorageKey {
  TOKEN = 'token',
  USER_ID = 'user-id',
}

export enum UserRole {
  CLIENT = 'client',
  ADMIN = 'admin',
}

export enum EndPoint {
  AUTH = 'auth',
  USERS = 'users',
  EVENTS = 'events',
  OPTIONS = 'options',
  ORDERS = 'orders',
  COMPUTER_TYPES = 'computer-types',
  ROOM_TYPES = 'room-types',
  BOOKINGS = 'bookings',
  COMPUTERS = 'computers',
  REVIEWS = 'reviews',
  ROOMS = 'rooms',
}

export enum RoomPageAccordionItem {
  COMPUTERS = 'computers',
  REVIEWS = 'reviews',
}
