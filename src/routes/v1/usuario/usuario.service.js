import boom from '@hapi/boom'
import bcrypt from 'bcrypt'
import { connectDB, closeDB } from '../../../libs/mongo.js'
import { Usuario } from '../../../models/usuario.model.js'

class UsuarioService {
  constructor(){}

  async create(data) {
    let connection
    try {
      connection = await connectDB()

      data.password = await bcrypt.hash(data.password, 10)

      const usuario = new Usuario(data)
      const usuarioGuardado = await usuario.save()

      return {
        id: usuarioGuardado.id,
        nombre: usuarioGuardado.nombre,
        correo: usuarioGuardado.correo,
        rol: usuarioGuardado.rol
      }
    } catch (e) {
      throw e
    } finally {
      if (connection) await closeDB()
    }
  }

  async find() {
    let connection
    try {
      connection = await connectDB()

      const usuarios = await Usuario.find()
      return usuarios.map(usuario => {
        return {
          id: usuario.id,
          nombre: usuario.nombre,
          correo: usuario.correo,
          rol: usuario.rol
        }
      })
    } catch (e) {
      throw e
    } finally {
      if (connection) await closeDB()
    }
  }

  async findOne(id) {
    let connection
    try {
      connection = await connectDB()

      const usuario = await Usuario.findById(id)
      if (!usuario) throw boom.notFound('Usuario no encontrado')
      return {
        id: usuario.id,
        nombre: usuario.nombre,
        correo: usuario.correo,
        rol: usuario.rol
      }
    } catch (e) {
      throw e
    } finally {
      if (connection) await closeDB()
    }
  }

  async update(id, changes) {
    let connection
    try {
      connection = await connectDB()

      const usuario = await Usuario.findByIdAndUpdate(id, changes)
      if (!usuario) throw boom.notFound('Usuario no encontrado')

      let newUsuario = { ...usuario._doc, ...changes }
      return {
        id: newUsuario.id,
        nombre: newUsuario.nombre,
        correo: newUsuario.correo,
        rol: newUsuario.rol
      }
    } catch (e) {
      throw e
    } finally {
      if (connection) await closeDB()
    }
  }

  async delete(id) {
    let connection
    try {
      connection = await connectDB()

      const usuario = await Usuario.findByIdAndDelete(id)
      if (!usuario) throw boom.notFound('Usuario no encontrado')

      return {
        id: usuario.id,
        nombre: usuario.nombre,
        correo: usuario.correo,
        rol: usuario.rol
      }
    } catch (e) {
      throw e
    } finally {
      if (connection) await closeDB()
    }
  }
}

export { UsuarioService }