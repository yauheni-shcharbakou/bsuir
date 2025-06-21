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

export enum ErrorMessage {
  UNKNOWN_ERROR = 'Неизвестная ошибка',
  FORBIDDEN = 'Ошибка доступа',
  UNAUTHORIZED = 'Ошибка авторизации',
  NOT_FOUND = 'Не найдено',
  INVALID_PASSWORD = 'Неверный пароль',
}

export enum EntityName {
  BOOKING = 'бронь',
  COMPUTER = 'компьютер',
  COMPUTER_TYPE = 'тип компьютера',
  EVENT = 'мероприятие',
  OPTION = 'услуга',
  ORDER = 'заказ',
  REVIEW = 'отзыв',
  ROOM = 'помещение',
  ROOM_TYPE = 'тип помещения',
  USER = 'пользователь',
}

export enum ControllerTag {
  MAIN = 'Основное',
  AUTH = 'Авторизация',
  BOOKING = 'Бронь',
  COMPUTER = 'Компьютеры',
  COMPUTER_TYPE = 'Типы компьютеров',
  EVENT = 'Мероприятия',
  OPTION = 'Услуги',
  ORDER = 'Заказы',
  REVIEW = 'Отзывы',
  ROOM = 'Помещения',
  ROOM_TYPE = 'Типы помещений',
  USER = 'Пользователи',
}

export enum HandlerSummary {
  HEALTH_CHECK = 'Проверка работы сервера',

  AUTH_REFRESH = 'Обновление токена',
  AUTH_LOGIN = 'Вход в систему',
  AUTH_REGISTER = 'Регистрация пользователя',

  BOOKING_GET_ALL = 'Получение всех бронь',
  BOOKING_GET_BY_ID = 'Получение брони по id',
  BOOKING_UPDATE = 'Обновление брони',
  BOOKING_DELETE = 'Удаление брони',

  COMPUTER_TYPE_GET_ALL = 'Получение всех типов компьютеров',
  COMPUTER_TYPE_GET_BY_ID = 'Получение типа компьютера по id',
  COMPUTER_TYPE_CREATE = 'Создание типа компьютера',
  COMPUTER_TYPE_UPDATE = 'Обновление типа компьютера',
  COMPUTER_TYPE_DELETE = 'Удаление типа компьютера',

  EVENT_GET_ALL = 'Получение всех мероприятий',
  EVENT_GET_BY_USER = 'Получение всех мероприятий пользователя',
  EVENT_GET_BY_ID = 'Получение мероприятия по id',
  EVENT_CREATE = 'Создание мероприятия',
  EVENT_UPDATE_SEEN_BY = 'Обновление статуса просмотра пользователем мероприятия',
  EVENT_UPDATE_INFO = 'Обновление информации мероприятия',
  EVENT_DELETE = 'Удаление мероприятия',

  OPTION_GET_ALL = 'Получение всех сервисов',
  OPTION_GET_BY_ID = 'Получение сервиса по id',
  OPTION_CREATE = 'Создание сервиса',
  OPTION_UPDATE = 'Обновление сервиса',
  OPTION_DELETE = 'Удаление сервиса',

  ORDER_GET_BY_USER = 'Получение всех заказов пользователя',
  ORDER_GET_BY_ID = 'Получение заказа по id',
  ORDER_CREATE = 'Создание заказа',
  ORDER_DELETE = 'Удаление заказа',

  REVIEW_GET_BY_ID = 'Получение отзыва по id',
  REVIEW_UPDATE = 'Обновление отзыва',
  REVIEW_DELETE = 'Удаление отзыва',

  COMPUTER_GET_BY_ID = 'Получение компьютера по id',
  COMPUTER_GET_COMPUTER_BOOKINGS = 'Получение бронь на компьютер',
  COMPUTER_CREATE_COMPUTER_BOOKING = 'Бронирование компьютера',
  COMPUTER_UPDATE_ROOM = 'Обновление помещения компьютера',
  COMPUTER_UPDATE_TYPE = 'Обновление типа компьютера у компьютера',
  COMPUTER_UPDATE_CODE = 'Обновление кода компьютера',
  COMPUTER_DELETE = 'Удаление компьютера',

  ROOM_GET_ALL_ROOMS = 'Получение всех помещений',
  ROOM_GET_ROOM_BY_ID = 'Получение помещения по id',
  ROOM_GET_ROOM_COMPUTERS = 'Получение компьютеров помещения',
  ROOM_GET_ROOM_REVIEWS = 'Получение отзывов помещения',
  ROOM_CREATE_ROOM = 'Создание помещения',
  ROOM_CREATE_ROOM_COMPUTER = 'Создание компьютера помещения',
  ROOM_CREATE_ROOM_REVIEW = 'Создание отзыва помещения',
  ROOM_UPDATE = 'Обновление помещения',
  ROOM_DELETE = 'Удаление помещения',

  ROOM_TYPE_GET_ALL = 'Получение всех типов помещений',
  ROOM_TYPE_GET_BY_ID = 'Получение типа помещения по id',
  ROOM_TYPE_CREATE = 'Создание типа помещения',
  ROOM_TYPE_UPDATE = 'Обновление типа помещения',
  ROOM_TYPE_DELETE = 'Удаление типа помещения',

  USER_GET_ALL = 'Получение всех пользователей',
  USER_GET_BY_ID = 'Получение пользователя по id',
  USER_UPDATE_ROLE = 'Обновление роли пользователя',
  USER_UPDATE_INFO = 'Обновление информации пользователя',
  USER_DELETE = 'Удаление пользователяя',
}
