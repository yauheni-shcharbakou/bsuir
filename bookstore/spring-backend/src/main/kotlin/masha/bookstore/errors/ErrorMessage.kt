package masha.bookstore.errors

object ErrorMessage {
    const val BAD_REQUEST = "Некорректные данные запроса"
    const val UNKNOWN_ERROR = "Неизвестная ошибка"
    const val INVALID_PASSWORD = "Неверный пароль"
    const val USER_ALREADY_EXISTS = "Пользователь с таким E-mail уже существует"
    const val NO_USER_WITH_THIS_EMAIL = "Пользователь с таким E-mail не существует"
    const val UNAUTHORIZED = "Ошибка авторизации"
}