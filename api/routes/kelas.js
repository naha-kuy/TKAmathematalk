import { Router } from 'express'
import { authenticate, authorize } from '../middleware/auth.js'
import * as KelasController from '../controllers/kelas.js'

const router = Router()

router.get('/', KelasController.list)
router.post('/', authenticate, authorize('guru'), KelasController.create)
router.delete('/:id', authenticate, authorize('guru'), KelasController.remove)

export default router
