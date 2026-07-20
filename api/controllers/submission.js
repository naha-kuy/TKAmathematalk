import * as BankSoalModel from '../models/BankSoal.js'
import * as SubmissionModel from '../models/Submission.js'

export async function submit(req, res) {
  try {
    const { bank_soal_id, jawaban } = req.body
    if (!bank_soal_id || !jawaban || !Array.isArray(jawaban)) {
      return res.status(400).json({ error: 'Data jawaban tidak valid' })
    }

    const soal = await BankSoalModel.findBankSoalById(bank_soal_id)
    if (!soal) return res.status(404).json({ error: 'Bank soal tidak ditemukan' })

    const kunci = JSON.parse(soal.kunci_jawaban)
    let correct = 0
    const total = kunci.questions.length

    const results = kunci.questions.map(q => {
      const userAnswer = jawaban.find(j => j.no === q.no)
      const isCorrect = userAnswer && userAnswer.answer === q.answer
      if (isCorrect) correct++
      return {
        no: q.no,
        user_answer: userAnswer?.answer || '',
        correct_answer: q.answer,
        is_correct: !!isCorrect
      }
    })

    const nilai = total > 0 ? Math.round((correct / total) * 100 * 100) / 100 : 0

    await SubmissionModel.createSubmission({
      siswa_id: req.user.id,
      bank_soal_id,
      jawaban,
      nilai
    })

    const lastSubmission = await SubmissionModel.getLastSubmission(req.user.id, bank_soal_id)

    res.json({
      nilai,
      correct,
      total,
      results,
      submission_id: lastSubmission?.id
    })
  } catch (err) {
    console.error('Submit error:', err)
    res.status(500).json({ error: 'Gagal mengirim jawaban' })
  }
}

export async function history(req, res) {
  try {
    const { bank_soal_id } = req.query
    const submissions = await SubmissionModel.getHistory(req.user.id)
    res.json(submissions)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Gagal memuat riwayat' })
  }
}
