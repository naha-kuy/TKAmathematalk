import { Router } from 'express'
import { authenticate, authorize } from '../middleware/auth.js'
import * as SubmissionController from '../controllers/submission.js'

const router = Router()

router.post('/', authenticate, authorize('siswa'), SubmissionController.submit)
router.get('/history', authenticate, authorize('siswa'), SubmissionController.history)

export default router
