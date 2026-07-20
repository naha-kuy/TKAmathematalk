import { Router } from 'express'
import * as AuthController from '../controllers/auth.js'

const router = Router()

router.post('/login', AuthController.login)
router.post('/signup', AuthController.signup)
router.get('/me', AuthController.me)

export default router
