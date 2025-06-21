import { authorService } from '../services/index.js'
import { deleteBooks, errorHandler } from '../shared/helpers.js'

export default class AuthorController {
  async get(req, res) {
    const authors = await authorService.get()
    return res.json(authors)
  }

  async create(req, res, next) {
    return errorHandler(async () => {
      const author = await authorService.create(req.body.name)
      return res.json(author)
    }, next)
  }

  async change(req, res, next) {
    return errorHandler(async () => {
      const author = await authorService.change(req.body._id, req.body.name)
      return res.json(author)
    }, next)
  }

  async delete(req, res, next) {
    return errorHandler(async () => {
      const id = await authorService.delete(req.body._id)
      await deleteBooks({ _author: id })
      return res.json(id)
    }, next)
  }
}
