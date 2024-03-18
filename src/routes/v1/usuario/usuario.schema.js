import Joi from 'joi'

const id = Joi.string()
const nombre = Joi.string()
const correo = Joi.string().email()
const password = Joi.string().min(8)
const rol = Joi.string().min(5)

const createUsuarioSchema = Joi.object({
  nombre: nombre.required(),
  correo: correo.required(),
  password: password.required(),
  rol: rol.required()
})

const updateUsuarioSchema = Joi.object({
  nombre: nombre,
  correo: correo,
  rol: rol
})

const getUsuarioSchema = Joi.object({
  id: id.required()
})

export { createUsuarioSchema, updateUsuarioSchema, getUsuarioSchema }