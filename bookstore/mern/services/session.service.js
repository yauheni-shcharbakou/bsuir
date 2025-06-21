import SessionModel from '../models/session.model.js'

export default class SessionService {
  async get() {
    return SessionModel.find({}).populate('_user').lean()
  }

  async create(_user) {
    const session = await new SessionModel({
      _user,
      date: new Date().toDateString(),
    })
    await session.save()
    return SessionModel.findById(session._id)
  }

  async deleteWithUser(userId) {
    await SessionModel.deleteMany({ _user: userId })
  }
}
