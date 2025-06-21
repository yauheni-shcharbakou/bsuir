import axios from 'axios'

export default class BaseRepository {
  api = axios.create({ baseURL: '' })
}
