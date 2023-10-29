import { rejects } from 'assert'
import jwt from 'jsonwebtoken'
import { resolve } from 'path'
import { config } from 'dotenv'
import { error } from 'console'
import { TokenPayload } from '~/models/requests/User.request'
config()
export const signToken = ({
  payload,
  privateKey = process.env.JWT_SECRET as string,
  options = { algorithm: 'HS256' }
}: {
  payload: string | object | Buffer
  privateKey?: string
  options?: jwt.SignOptions
}) => {
  return new Promise<string>((resolve, reject) => {
    jwt.sign(payload, privateKey, options, (error, token) => {
      if (error) {
        throw reject(error)
      }
      resolve(token as string)
    })
  })
}
//ham kiem tra token co phai la cua minh tao ra khong , neu co thitra ra payload
export const verifyToken = ({
  token,
  secretOrPublickey = process.env.JWT_SECRET as string
}: {
  token: string
  secretOrPublickey?: string
}) => {
  return new Promise<TokenPayload>((resolve, rejects) => {
    jwt.verify(token, secretOrPublickey, (error, decoded) => {
      if (error) throw rejects(error)
      resolve(decoded as TokenPayload)
    })
  })
}
