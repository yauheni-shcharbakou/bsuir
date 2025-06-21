import CategoryModel from '../models/category.model.js'

export default class CategoryService {
  async get() {
    return CategoryModel.find({}).lean()
  }

  async getOne(_id) {
    return CategoryModel.findById(_id).lean()
  }

  async create(name) {
    const category = await new CategoryModel({ name })
    await category.save()
    return category
  }

  async change(_id, name) {
    const category = await CategoryModel.findByIdAndUpdate(_id, {
      $set: { name },
    }).lean()
    return { ...category, name }
  }

  async delete(_id) {
    await CategoryModel.findByIdAndRemove(_id)
    return _id
  }
}
