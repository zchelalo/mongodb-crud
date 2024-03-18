import mongoose from 'mongoose'

const usuarioSchema = mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true
  },
  correo: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
  rol: {
    type: String,
    required: true,
    default: 'usuario',
    enum: ['usuario', 'admin']
  },
  recoveryToken: {
    type: String,
    default: null
  }
})

const Usuario = mongoose.model('Usuario', usuarioSchema)

export { Usuario }