import boom from '@hapi/boom'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { config } from '../../../config/config.js'

import { connectDB, closeDB } from '../../../libs/mongo.js'
import { Usuario } from '../../../models/usuario.model.js'

class AuthService {
  constructor(){}

  async getUsuario(correo, password) {
    let connection
    try {
      connection = await connectDB()

      const usuario = await Usuario.findOne({ correo })
      if (!usuario) throw boom.notFound('Usuario no encontrado')

      const match = await bcrypt.compare(password, usuario.password)
      if (!match) throw boom.unauthorized('Correo o contraseña incorrectos')

      delete usuario.password
      return usuario
    } catch (e) {
      throw e
    } finally {
      if (connection) await closeDB()
    }
  }

  async signToken(usuario){
    const payload = {
      sub: usuario.id,
      rol: usuario.rol
    }
    const token = jwt.sign(payload, config.JWT_SECRET, { expiresIn: '2h' })
    return token
  }

  async changePassword(token, newPassword){
    try {
      const payload = jwt.verify(token, config.JWT_RECOVERY_SECRET)
      const usuario = await Usuario.findById(payload.sub)

      if (!usuario) {
        throw boom.notFound('Usuario no encontrado')
      }

      if (usuario.recoveryToken !== token){
        throw boom.unauthorized('Token inválido')
      }

      newPassword = await bcrypt.hash(newPassword, 10)

      await Usuario.findByIdAndUpdate(usuario.id, {
        recoveryToken: null,
        password: newPassword
      })

      return { message: 'Contraseña actualizada correctamente' }
    } catch (e) {
      throw e
    }
  }
}

export { AuthService }