import ApiError from '../shared/api.error.js'
import { UNKNOWN_ERROR } from '../shared/constants.js'

export default function errorMiddleware(err, req, res, next) {
  if (err instanceof ApiError) {
    return res.status(err.status).json({ message: err.message })
  }

  return res.status(500).json({ message: UNKNOWN_ERROR })
}
