import { sessionService } from '../services/index.js'

export default class SessionController {
  async get(req, res) {
    const sessions = await sessionService.get()
    return res.json(sessions)
  }
}
