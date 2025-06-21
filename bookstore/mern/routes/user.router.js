import { Router } from 'express'
import { userController } from '../controllers/index.js'
import { roleMiddleware } from '../middleware/index.js'

const userRouter = Router()

userRouter.get('/book', userController.getBooks)
userRouter.get('/', roleMiddleware(['admin']), userController.getAll)
userRouter.post('/register', userController.register)
userRouter.post('/login', userController.login)
userRouter.post('/auth', userController.auth)
userRouter.patch('/book', userController.changeBooks)
userRouter.patch('/role', roleMiddleware(['admin']), userController.change)
userRouter.delete('/', roleMiddleware(['admin']), userController.delete)

export default userRouter
