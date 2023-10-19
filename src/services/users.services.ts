import { register } from 'module'
import User from '~/models/schemas/User.schema'
import databaseService from './database.services'
import { registerReqBody } from '~/models/requests/User.request'
import { hashPassword } from '~/utils/crypto'
import { signToken } from '~/utils/jwt'
import { TokenType } from '~/constants/emuns'
databaseService
class UserServices {
  private signAccessToken(user_id: string) {
    return signToken({
      payload: { user_id, token_type: TokenType.AccessToken },
      options: { expiresIn: process.env.ACCESS_TOKEN_EXPIRE_IN }
    })
  }

  private signRefreshToken(user_id: string) {
    return signToken({
      payload: { user_id, token_type: TokenType.RefreshToken },
      options: { expiresIn: process.env.REFRESH_TOKEN_EXPIRE_IN }
    })
  }

  async register(payload: registerReqBody) {
    const result = await databaseService.users.insertOne(
      new User({
        ...payload,
        date_of_birth: new Date(payload.date_of_birth),
        password: hashPassword(payload.password)
      })
    )
    //lay user_id tu account vua tao
    const user_id = result.insertedId.toString()
    //tu user_id tao ra 1 access token va 1 refesh token
    // const AccessToken = await this.signAccessToken(user_id)
    // const RefreshToken = await this.signRefreshToken(user_id)

    const [AccessToken, RefreshToken] = await Promise.all([
      this.signAccessToken(user_id),
      this.signRefreshToken(user_id)
    ])

    return result
  }

  async checkEmailExist(email: string) {
    //vao database tim user cos email nay
    const user = await databaseService.users.findOne({ email })
    return Boolean(user)
  }
}
const userServices = new UserServices()
export default userServices
