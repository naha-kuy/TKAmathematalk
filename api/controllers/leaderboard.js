import * as SubmissionModel from '../models/Submission.js'

export async function get(req, res) {
  try {
    const kelasId = req.query.kelas_id || null
    const leaderboard = await SubmissionModel.getLeaderboard(kelasId)
    res.json(leaderboard)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Gagal memuat leaderboard' })
  }
}
