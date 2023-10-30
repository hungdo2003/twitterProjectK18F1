import { Response, Request, NextFunction } from 'express'
import User from '~/models/schemas/User.schema'
import databaseService from '~/services/database.services'
import userServices from '~/services/users.services'
import { ParamsDictionary } from 'express-serve-static-core'
import { EmailVerifyReqBody, LogoutReqBody, RegisterReqBody, TokenPayload } from '~/models/requests/User.request'
import { ObjectId } from 'mongodb'
import { USERS_MESSAGES } from '~/constants/messages'
import HTTP_STATUS from '~/constants/httpStatus'
export const loginController = async (req: Request, res: Response) => {
  //vào req lấy user và _id của user đó
  // dùng cái user_id đó tạo access và refresh_token
  const user = req.user as User
  //_id lay tu mongo xuong
  const user_id = user._id as ObjectId
  const result = await userServices.login(user_id.toString())
  //k cos tostring bi bug
  return res.json({
    message: USERS_MESSAGES.LOGIN_SUCCESS,
    result
  })
}
export const registerController = async (
  req: Request<ParamsDictionary, any, RegisterReqBody>,
  res: Response,
  next: NextFunction
) => {
  const result = await userServices.register(req.body)
  return res.status(201).json({
    message: USERS_MESSAGES.REGISTER_SUCCESS,
    result
  })
}
export const logoutController = async (req: Request<ParamsDictionary, any, LogoutReqBody>, res: Response) => {
  //lay refresh_token tu body
  const refresh_token = req.body.refresh_token
  //goi ham logout , ham nhan vao refresh_token tim va xoa
  const result = await userServices.logout(refresh_token)
  res.json(result)
}

export const emailVerifyController = async (req: Request<ParamsDictionary, any, EmailVerifyReqBody>, res: Response) => {
  //khi ma req vao duoc day thi email_verify_token da valid
  //dong thoi trong req se cos decoded_email_verify_token
  const { user_id } = req.decoded_email_verify_token as TokenPayload
  //tim xem user co ma nay khon
  const user = await databaseService.users.findOne({ _id: new ObjectId(user_id) })
  if (user === null) {
    return res.status(HTTP_STATUS.NOT_FOUND).json({
      message: USERS_MESSAGES.USER_NOT_FOUND
    })
  }
  //neu co user do thi minh se kiem tra xem user do co luu verifytoken khong
  if (user.email_verify_token === '') {
    return res.json({
      message: USERS_MESSAGES.EMAIL_ALREADY_VERIFIED_BEFORE
    })
  }
  //neu xuong duoc day thi user nay la chua co va chua duoc verify
  //verifiEmail(user_id) la: tim user do bang user_id
  //va update lai email_verify_token thanh '' va verify: 1
  const result = await userServices.verifyEmail(user_id)
  return res.json({
    message: USERS_MESSAGES.EMAIL_VERIFY_SUCCESS,
    result
  })
}
