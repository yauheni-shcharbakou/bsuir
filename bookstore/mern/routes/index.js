import { Router } from 'express'
import userRouter from './user.router.js'
import authorRouter from './author.router.js'
import categoryRouter from './category.router.js'
import offerRouter from './offer.router.js'
import orderRouter from './order.router.js'
import publisherRouter from './publisher.router.js'
import reviewRouter from './review.router.js'
import paymentRouter from './payment.router.js'
import sessionRouter from './session.router.js'
import bookRouter from './book.router.js'

const apiRouter = Router()

apiRouter.use('/user', userRouter)
apiRouter.use('/author', authorRouter)
apiRouter.use('/book', bookRouter)
apiRouter.use('/category', categoryRouter)
apiRouter.use('/offer', offerRouter)
apiRouter.use('/order', orderRouter)
apiRouter.use('/publisher', publisherRouter)
apiRouter.use('/review', reviewRouter)
apiRouter.use('/payment', paymentRouter)
apiRouter.use('/session', sessionRouter)

export default apiRouter
