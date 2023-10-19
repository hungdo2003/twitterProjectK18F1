//1 ai do truy cap vao /login
//client se sui cho minh username va password
//client se tao request gui server
//thi username va password se nam o request

import { Request, Response, NextFunction } from 'express'
import { checkSchema } from 'express-validator'
import userServices from '~/services/users.services'
import { validate } from '~/utils/validation'

//viet 1 middleware de xu ly validator cua req cua body do
export const loginValidator = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(400).json({
      message: 'Missing email or password'
    })
  }
  next()
}

//khi register, body gom
// {
// name: string,
// email: String,
// password: string,
// confir_password: string,
// date_of_birth: ISO8601,
// }

export const registerValidator = validate(
  checkSchema({
    name: {
      notEmpty: true,
      isString: true,
      trim: true,
      isLength: {
        options: {
          min: 1,
          max: 100
        }
      }
    },
    email: {
      notEmpty: true,
      isEmail: true,
      trim: true,
      custom: {
        options: async (value, { req }) => {
          const isExistEmail = await userServices.checkEmailExist(value)
          if (isExistEmail) {
            throw new Error('email already esists')
          }
          return true
        }
      }
    },

    password: {
      notEmpty: true,
      isString: true,
      trim: true,
      isLength: {
        options: {
          min: 8,
          max: 50
        }
      },
      isStrongPassword: {
        options: {
          minLength: 8,
          minLowercase: 1,
          minUppercase: 1,
          minNumbers: 1,
          minSymbols: 1,
          returnScore: true
        }
      },
      errorMessage:
        'password must be at least 8 chars long, contain at least 1 lowercaseletter, 1 uppercase letter, 1 number, and 1 symbol'
    },
    confirmPassword: {
      notEmpty: true,
      isString: true,
      trim: true,
      isLength: {
        options: {
          min: 8,
          max: 50
        }
      },
      isStrongPassword: {
        options: {
          minLength: 8,
          minLowercase: 1,
          minUppercase: 1,
          minNumbers: 1,
          minSymbols: 1,
          returnScore: true
        },
        errorMessage:
          'password must be at least 8 chars long, contain at least 1 lowercaseletter, 1 uppercase letter, 1 number, and 1 symbol'
      },
      custom: {
        options: (value, { req }) => {
          if (value !== req.body.password) {
            throw new Error('Password confirmation does not match password')
          }
          return true
        }
      }
    },

    date_of_birth: {
      isISO8601: {
        options: {
          strict: true,
          strictSeparator: true
        }
      }
    }
  })
)
