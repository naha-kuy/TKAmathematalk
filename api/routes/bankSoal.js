import { Router } from 'express'
import { authenticate, authorize } from '../middleware/auth.js'
import * as BankSoalController from '../controllers/bankSoal.js'

const router = Router()

router.get('/', authenticate, BankSoalController.list)
router.get('/:id', authenticate, BankSoalController.detail)
router.post('/', authenticate, authorize('guru'), BankSoalController.create)
router.put('/:id', authenticate, authorize('guru'), BankSoalController.update)
router.delete('/:id', authenticate, authorize('guru'), BankSoalController.remove)

export default router
