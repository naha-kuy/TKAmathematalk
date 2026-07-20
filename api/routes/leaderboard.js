import { Router } from 'express'
import { authenticate } from '../middleware/auth.js'
import * as LeaderboardController from '../controllers/leaderboard.js'

const router = Router()

router.get('/', authenticate, LeaderboardController.get)

export default router
