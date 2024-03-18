import Joi from 'joi'

const correo = Joi.string().email()
const password = Joi.string().min(8)
const token = Joi.string().regex(/^[A-Za-z0-9-_]+.[A-Za-z0-9-_]+.[A-Za-z0-9-_.+/=]*$/)
const newPassword = Joi.string().min(8)

const loginSchema = Joi.object({
  correo: correo.required(),
  password: password.required()
})

const recoverySchema = Joi.object({
  correo: correo.required()
})

const changePasswordSchema = Joi.object({
  token: token.required(),
  newPassword: newPassword.required()
})

export { loginSchema, recoverySchema, changePasswordSchema }
