import { Request, Response } from 'express'
import User from '~/models/schemas/User.schema'
import databaseService from '~/services/database.services'
import userServices from '~/services/users.services'
import { ParamsDictionary } from 'express-serve-static-core'
import { registerReqBody } from '~/models/requests/User.request'

export const loginController = (req: Request, res: Response) => {
  const { email, password } = req.body
  if (email === 'hungdo31102003h@gmail.com' && password === '12345') {
    return res.json({
      data: [
        { fname: 'Điệp', yob: 1999 },
        { fname: 'Hùng', yob: 2003 },
        { fname: 'Được', yob: 1994 }
      ]
    })
  }
  return res.status(400).json({
    message: 'login failed'
  })
}

export const registerController = async (req: Request<ParamsDictionary, any, registerReqBody>, res: Response) => {
  const { email, password } = req.body
  try {
    //tao 1 user moi bo vao collection users trong database
    const result = await userServices.register(req.body)
    return res.status(201).json({
      message: 'register succesfully',
      result
    })
  } catch (error) {
    return res.status(400).json({
      message: 'failed',
      error
    })
  }
}
