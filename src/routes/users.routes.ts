import { Router } from 'express'
import { register } from 'module'
import {
  emailVerifyController,
  loginController,
  logoutController,
  registerController
} from '~/controllers/users.controllers'
import {
  accessTokenValidator,
  emailVerifyValidator,
  loginVAlidator,
  refreshTokenValidator,
  registerValidator
} from '~/middlewares/users.middlewares'
import { wrapAsync } from '~/utils/handlers'

const usersRouter = Router()

usersRouter.get('/login', loginVAlidator, wrapAsync(loginController))

// usersRouter.post('/register', registerValidator, registerController)
usersRouter.post('/register', registerValidator, wrapAsync(registerController))
//   (req, res, next) => {
//     console.log('Req handler1')
//     next(new Error('Error in handler 1'))
//   }, // async -> next bth, throw bi loi do || hoặc try cath bát nó
//   // con bth thi bth hehe
//   (req, res, next) => {
//     console.log('Req handler2')
//     next()
//   },
//   (req, res, next) => {
//     console.log('Req handler3')
//     res.json({ message: `Register Success` })

/*
des: dang xuat
path: /users/logout
mehodL POST
Header: {authorization: 'Bearer <access_token>'}
body: {refresh_token: string}
*/
usersRouter.post('/logout', accessTokenValidator, refreshTokenValidator, wrapAsync(logoutController))

/*
des: verify email
khi nguoi dung dang ky thi trong email cua ho se co 1 link
. Trong link nay co san 1 req kem email_verify_token
thi vrify email la cai routes cho req do
mehtod: POST
path: /users/email
body: {email_verify_token: string}
*/

usersRouter.post('/verify-email', emailVerifyValidator, wrapAsync(emailVerifyController))
export default usersRouter
