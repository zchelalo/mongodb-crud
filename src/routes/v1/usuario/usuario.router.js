import express from 'express'

import { UsuarioService } from './usuario.service.js'
import { validatorHandler } from '../../../middlewares/validator.handler.js'
import { updateUsuarioSchema, createUsuarioSchema, getUsuarioSchema } from './usuario.schema.js'

import passport from 'passport'
import { checkRoles } from '../../../middlewares/auth.handler.js'

const router = express.Router()
const service = new UsuarioService()

// router.get('/', checkRoles('usuario', 'admin'), async (req, res, next) => {
router.get('/', passport.authenticate('jwt', { session: false }), async (req, res, next) => {
  try {
    const usuarios = await service.find()
    res.json(usuarios)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', passport.authenticate('jwt', { session: false }), validatorHandler(getUsuarioSchema, 'params'), async (req, res, next) => {
  try {
    const { id } = req.params
    const usuario = await service.findOne(id)
    res.json(usuario)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const usuarios = await service.find()
    if (usuarios.length === 0) {
      next()
    } else {
      passport.authenticate('jwt', { session: false })(req, res, next)
    }
  } catch (e) {
    next(e)
  }
}, validatorHandler(createUsuarioSchema, 'body'), async (req, res, next) => {
  try {
    const body = req.body
    const newUsuario = await service.create(body)
    res.status(201).json(newUsuario)
  } catch (error) {
    next(error)
  }
})

router.patch('/:id', passport.authenticate('jwt', { session: false }), validatorHandler(getUsuarioSchema, 'params'), validatorHandler(updateUsuarioSchema, 'body'), async (req, res, next) => {
  try {
    const { id } = req.params
    const body = req.body
    const usuario = await service.update(id, body)
    res.json(usuario)
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', passport.authenticate('jwt', { session: false }), validatorHandler(getUsuarioSchema, 'params'), async (req, res, next) => {
  try {
    const { id } = req.params
    const respuesta = await service.delete(id)
    res.status(201).json(respuesta)
  } catch (error) {
    next(error)
  }
})

export { router }