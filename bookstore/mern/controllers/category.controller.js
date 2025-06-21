import { categoryService } from '../services/index.js'
import { deleteBooks, errorHandler } from '../shared/helpers.js'

export default class CategoryController {
  async get(req, res) {
    const publishers = await categoryService.get()
    return res.json(publishers)
  }

  async create(req, res, next) {
    return errorHandler(async () => {
      const category = await categoryService.create(req.body.name)
      return res.json(category)
    }, next)
  }

  async change(req, res, next) {
    return errorHandler(async () => {
      const category = await categoryService.change(req.body._id, req.body.name)
      return res.json(category)
    }, next)
  }

  async delete(req, res, next) {
    return errorHandler(async () => {
      const id = await categoryService.delete(req.body._id)
      await deleteBooks({ _category: id })
      return res.json(id)
    }, next)
  }
}
