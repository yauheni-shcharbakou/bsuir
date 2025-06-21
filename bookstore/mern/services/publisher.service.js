import PublisherModel from '../models/publisher.model.js'

export default class PublisherService {
  async get() {
    return PublisherModel.find({}).lean()
  }

  async getOne(_id) {
    return PublisherModel.findById(_id).lean()
  }

  async create(name, address) {
    const publisher = await new PublisherModel({ name, address })
    await publisher.save()
    return publisher
  }

  async change(_id, name, address) {
    const publisher = await PublisherModel.findByIdAndUpdate(_id, {
      $set: { name, address },
    }).lean()
    return { ...publisher, name, address }
  }

  async delete(_id) {
    await PublisherModel.findByIdAndRemove(_id)
    return _id
  }
}
