import ApiError from '../shared/api.error.js'
import { ACCESS_ERROR, AUTH_ERROR } from '../shared/constants.js'

export default function roleMiddleware(roles) {
  return (req, res, next) => {
    if (req.method === 'OPTIONS') return next()

    try {
      const user = JSON.parse(req.headers.authorization)

      if (!user) {
        return next(ApiError.authError(AUTH_ERROR))
      }

      if (roles && !roles.includes(user.role)) {
        return next(ApiError.forbidden(ACCESS_ERROR))
      }

      req.user = user
      next()
    } catch (e) {
      next(ApiError.authError(AUTH_ERROR))
    }
  }
}
