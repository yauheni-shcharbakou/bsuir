import ApiError from '../shared/api.error.js'
import {
  offerService,
  orderService,
  sessionService,
  userService,
} from '../services/index.js'
import { compareSync, hash } from 'bcrypt'
import {
  DEFAULT_SALT,
  INVALID_DATA_ERROR,
  INVALID_EMAIL,
  INVALID_PASSWORD,
  INVALID_PASSWORD_ERROR,
  NO_USER_ERROR,
  USER_EXISTS_ERROR,
} from '../shared/constants.js'
import { errorHandler, testEmail } from '../shared/helpers.js'

export default class UserController {
  async getAll(req, res) {
    const users = await userService.get()
    return res.json(users)
  }

  async register(req, res, next) {
    const { email, password, role } = req.body

    if (!email || !password) {
      return next(ApiError.badRequest(INVALID_DATA_ERROR))
    }

    if (!testEmail(email)) {
      return next(ApiError.badRequest(INVALID_EMAIL))
    }

    if (password.length < 3) {
      return next(ApiError.badRequest(INVALID_PASSWORD))
    }

    const candidate = await userService.getByEmail(email)

    if (candidate) {
      return next(ApiError.badRequest(USER_EXISTS_ERROR))
    }

    const usersCount = await userService.count()
    const hashPassword = await hash(password, DEFAULT_SALT)

    const user = await userService.create(
      email,
      hashPassword,
      !usersCount ? 'admin' : role
    )

    await sessionService.create(user._id)
    return res.json(user)
  }

  async login(req, res, next) {
    const { email, password } = req.body
    const user = await userService.getByEmail(email)

    if (!user) {
      return next(ApiError.internal(NO_USER_ERROR))
    }

    if (!compareSync(password, user.password)) {
      return next(ApiError.internal(INVALID_PASSWORD_ERROR))
    }

    await sessionService.create(user._id)
    return res.json(user)
  }

  async auth(req, res, next) {
    const user = await userService.getByEmail(req.body.email)

    if (!user) {
      return next(ApiError.internal(NO_USER_ERROR))
    }

    await sessionService.create(user._id)
    return res.json(user)
  }

  async getBooks(req, res) {
    const books = await userService.getBooks(req.query._id)
    return res.json(books)
  }

  async changeBooks(req, res, next) {
    return errorHandler(async () => {
      const { _id, _books } = req.body
      const user = await userService.changeBooks(_id, _books)
      return res.json(user)
    }, next)
  }

  async change(req, res, next) {
    return errorHandler(async () => {
      const { _id, role } = req.body
      const user = await userService.change(_id, role)
      return res.json(user)
    }, next)
  }

  async delete(req, res, next) {
    return errorHandler(async () => {
      const id = await userService.delete(req.body._id)
      await sessionService.deleteWithUser(id)
      await orderService.deleteWithUser(id)
      await offerService.deleteWithUser(id)
      return res.json(id)
    }, next)
  }
}
