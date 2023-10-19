import { Router } from 'express'
import { loginController, registerController } from '~/controllers/users.controllers'
import { loginValidator, registerValidator } from '~/middlewares/user.middlewares'
const usersRouter = Router()
usersRouter.get('/login', loginValidator, loginController)

usersRouter.post('/register', registerValidator, registerController)
export default usersRouter
