import { NextFunction, Request, Response } from 'express'
import { omit } from 'lodash'
import HTTP_STATUS from '~/constants/httpStatus'
import { ErrorWithStatus } from '~/models/Errors'
// trong err có status và message
export const defaultErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  //noi tap ket tat ca cac loi trong he thong
  if (err instanceof ErrorWithStatus) {
    return res.status(err.status).json(omit(err, ['status']))
  }

  //con neu code chay dc xuong day thi error se la 1 loi mac dinh
  //err{message, stack, name} set ve emunrable la true

  //*enumrable true thi moi co thuoc tinh
  Object.getOwnPropertyNames(err).forEach((key) => {
    Object.defineProperty(err, key, { enumerable: true })
  })
  //nem loi cho nguoi dung
  res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
    message: err.message,
    errorInfor: omit(err, ['stack'])
  })
}
