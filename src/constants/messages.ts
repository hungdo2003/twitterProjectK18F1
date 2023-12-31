export const USERS_MESSAGES = {
  VALIDATION_ERROR: 'Validation error',
  //name
  NAME_IS_REQUIRED: 'Name is required',
  NAME_MUST_BE_A_STRING: 'Name must be a string',
  NAME_LENGTH_MUST_BE_FROM_1_TO_100: 'Name length must be from 1 to 100',
  //email
  EMAIL_ALREADY_EXISTS: 'Email already exists',
  EMAIL_IS_REQUIRED: 'Email is required',
  EMAIL_IS_INVALID: 'Email is invalid',
  EMAIL_VERIFY_SUCCESS: 'Email verify success',
  RESEND_EMAIL_VERIFY_SUCCESS: 'resend email is success',
  //password
  PASSWORD_IS_REQUIRED: 'Password is required',
  PASSWORD_MUST_BE_A_STRING: 'Password must be a string',
  PASSWORD_LENGTH_MUST_BE_FROM_8_TO_50: 'Password length must be from 8 to 50',
  PASSWORD_MUST_BE_STRONG:
    'Password must be at least 8 characters long and contain at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 symbol',
  //confirmPassword
  CONFIRM_PASSWORD_IS_REQUIRED: 'Confirm password is required',
  CONFIRM_PASSWORD_MUST_BE_A_STRING: 'Confirm password must be a string',
  CONFIRM_PASSWORD_LENGTH_MUST_BE_FROM_8_TO_50: 'Confirm length must be from 8 to 50',
  CONFIRM_PASSWORD_MUST_BE_STRONG:
    'Confirm password must be at least 8 characters long and contain at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 symbol',
  CONFIRM_PASSWORD_MUST_BE_THE_SAME_AS_PASSWORD: 'Confirm password must be the same as password',
  //dateOfBirth
  DATE_OF_BIRTH_BE_ISO8601: 'Date of birth must be ISO8601',
  //user
  EMAIL_OR_PASSWORD_IS_INCORRECT: 'Email or password is incorrect',
  EMAIL_VERIFY_TOKEN_IS_REQUIRED: 'Email verify token is required',
  EMAIL_ALREADY_VERIFIED_BEFORE: 'Email already verified before',
  LOGIN_SUCCESS: 'login successfully',
  REGISTER_SUCCESS: 'Register successfullys',
  ACCESS_TOKEN_IS_REQUIRED: 'Access token is required',
  REFRESH_TOKEN_IS_REQUIRED: 'Refresh token is required',
  REFRESH_TOKEN_IS_INVALID: 'Refresh token is invalid',
  USED_REFRESH_TOKEN_OR_NOT_EXIST: ' Used refresh token or not exist',
  USER_NOT_FOUND: 'User not found',
  LOGOUT_SUCCESS: 'Logout successfully',
  FORGOT_PASSWORD_SUCCESS: 'forgot password success',
  CHECK_EMAIL_TORESET_PASSWORD: 'Check email to reset password',
  FOTGOT_PASSWORD_TOKEN_IS_REQUIRED: 'FOTGOT_PASSWORD_TOKEN_IS_REQUIRED',
  FORGOT_PASSWORD_TOKEN_IS_INVALID: 'FORGOT_PASSWORD_TOKEN_IS_INVALID',
  VERIFY_FORGOT_PASSWORD_TOKEN_SUCCESS: 'verify forgot password token success',
  RESET_PASSWORD_SUCCESSFULLY: 'success password successfully',
  GET_ME_SUCCESS: 'get me success'
} as const
