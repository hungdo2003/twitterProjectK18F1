import { createHash } from 'crypto'
import { create } from 'domain'
import { config } from 'dotenv'
config()

//doan code nay lay tu trang chu sha256
function sha256(content: string) {
  return createHash('sha256').update(content).digest('hex')
}

//ham ma hoa password
export function hashPassword(password: string) {
  return sha256(password + process.env.PASSWORD_SECRET)
}
