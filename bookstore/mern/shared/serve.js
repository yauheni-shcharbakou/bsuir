import { resolve } from 'path'

export default function serve(req, res) {
  res.sendFile(resolve('client', 'build', 'index.html'))
}
