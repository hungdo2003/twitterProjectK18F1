import User from '~/models/schemas/User.schema'
import databaseService from './database.services'
import { RegisterReqBody } from '~/models/requests/User.request'
import { hashPassword } from '~/utils/crypto'
import { signToken } from '~/utils/jwt'
import { TokenType, UserVerifyStatus } from '~/constants/enums'
import { config } from 'dotenv'
import { ObjectId } from 'mongodb'
import RefreshToken from '~/models/schemas/RefreshToken.schema'
import { USERS_MESSAGES } from '~/constants/messages'
config()
class UserServices {
  // F tạo accessToken
  private signAccessToken(user_id: string) {
    return signToken({
      payload: { user_id, token_type: TokenType.AccessToken },
      options: { expiresIn: process.env.ACCESS_TOKEN_EXPIRE_IN },
      privateKey: process.env.JWT_SECRET_ACCESS_TOKEN as string
    })
  }
  // F tạo refreshToken
  private signRefreshToken(user_id: string) {
    return signToken({
      payload: { user_id, token_type: TokenType.RefreshToKen },
      options: { expiresIn: process.env.REFRESH_TOKEN_EXPIRE_IN },
      privateKey: process.env.JWT_SECRET_REFRESH_TOKEN as string
    })
  }

  private signEmailVerifiToken(user_id: string) {
    return signToken({
      payload: { user_id, token_type: TokenType.EmailVerificationToken },
      options: { expiresIn: process.env.EMAIL_VERIFY_TOKEN_EXPIRE_IN },
      privateKey: process.env.JWT_SECRET_EMAIL_VERIFY_TOKEN as string
    })
  }
  private signAccessAndRefreshToken(user_id: string) {
    return Promise.all([this.signAccessToken(user_id), this.signRefreshToken(user_id)])
  }
  async register(payLoad: RegisterReqBody) {
    // const { email, password } = payLoad
    const user_id = new ObjectId()
    const email_verify_token = await this.signEmailVerifiToken(user_id.toString())
    const result = await databaseService.users.insertOne(
      new User({
        ...payLoad,
        _id: user_id,
        email_verify_token,
        date_of_birth: new Date(payLoad.date_of_birth),
        password: hashPassword(payLoad.password)
      })
    )

    // tạo ra access từ user_id và refresh
    const [access_token, refresh_token] = await this.signAccessAndRefreshToken(user_id.toString())
    //luu refesh vao database
    await databaseService.refreshTokens.insertOne(
      new RefreshToken({
        token: refresh_token,
        user_id: new ObjectId(user_id)
      })
    )
    //gia lap gui mail cho client
    console.log(email_verify_token)

    return { access_token, refresh_token }
  }
  async checkEmailExist(email: string) {
    // vào database tìm user có email
    const user = await databaseService.users.findOne({ email })
    return Boolean(user)
  }
  async login(user_id: string) {
    //dùng user_id tạo access_refresh
    const [access_token, refresh_token] = await this.signAccessAndRefreshToken(user_id.toString())
    //luu refresh token vao database

    await databaseService.refreshTokens.insertOne(
      new RefreshToken({
        token: refresh_token,
        user_id: new ObjectId(user_id)
      })
    )

    return { access_token, refresh_token }
    //return access refresh cho controller
  }

  async logout(refresh_token: string) {
    //dung refresh_token tim va xoa
    await databaseService.refreshTokens.deleteOne({ token: refresh_token })
    return {
      message: USERS_MESSAGES.LOGOUT_SUCCESS
    }
  }

  async verifyEmail(user_id: string) {
    //tao access va refresh token gui cho client va luu ref va database
    //dong thoi tim user va update email_verify_token thanh '', verify: 1, updateAt
    const [token] = await Promise.all([
      this.signAccessAndRefreshToken(user_id),
      databaseService.users.updateOne(
        {
          _id: new ObjectId(user_id)
        },
        [
          {
            $set: {
              email_verify_token: '',
              verify: UserVerifyStatus.Verified,
              updated_at: '$$NOW'
            }
          }
        ]
      )
    ])

    const [access_token, refresh_token] = token
    await databaseService.refreshTokens.insertOne(
      new RefreshToken({
        token: refresh_token,
        user_id: new ObjectId(user_id)
      })
    )
    return { access_token, refresh_token }
  }
}

const userServices = new UserServices()
export default userServices
