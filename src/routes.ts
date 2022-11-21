import { Router } from 'express'
import AuthController from './controllers/AuthController'
import UserController from './controllers/UserController'
import { AuthMiddleware } from './middlewares/auth'

const router = Router()

router.post('/', UserController.store)
router.get('/', AuthMiddleware, UserController.index)
router.post('/login', AuthController.login)

export default router
