import { Router } from 'express'
import { authenticate, authorize } from '../middleware/auth.js'
import * as SiswaController from '../controllers/siswa.js'

const router = Router()

router.get('/pending', authenticate, authorize('guru'), SiswaController.listPending)
router.put('/approve/:id', authenticate, authorize('guru'), SiswaController.approve)
router.get('/', authenticate, authorize('guru'), SiswaController.listAll)
router.get('/:id', authenticate, authorize('guru'), SiswaController.getDetail)
router.delete('/:id', authenticate, authorize('guru'), SiswaController.remove)

export default router
