import express from 'express'
import cors from 'cors'
import authRoutes from './routes/auth.js'
import siswaRoutes from './routes/siswa.js'
import kelasRoutes from './routes/kelas.js'
import bankSoalRoutes from './routes/bankSoal.js'
import submissionRoutes from './routes/submission.js'
import leaderboardRoutes from './routes/leaderboard.js'
import { authenticate } from './middleware/auth.js'

const app = express()

app.use(cors({ origin: true, credentials: true }))
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/siswa', siswaRoutes)
app.use('/api/kelas', kelasRoutes)
app.use('/api/bank-soal', bankSoalRoutes)
app.use('/api/submit', submissionRoutes)
app.use('/api/leaderboard', leaderboardRoutes)

app.get('/api/health', (req, res) => res.json({ status: 'ok' }))

export default app
