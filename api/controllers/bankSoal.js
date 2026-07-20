import * as BankSoalModel from '../models/BankSoal.js'

export async function list(req, res) {
  try {
    const list = await BankSoalModel.findAllBankSoal()
    res.json(list)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Gagal memuat bank soal' })
  }
}

export async function detail(req, res) {
  try {
    const soal = await BankSoalModel.findBankSoalById(req.params.id)
    if (!soal) return res.status(404).json({ error: 'Bank soal tidak ditemukan' })
    if (req.user.role === 'siswa') {
      const { kunci_jawaban, ...safe } = soal
      return res.json({ ...safe, total_soal: JSON.parse(kunci_jawaban).questions.length })
    }
    res.json(soal)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Gagal memuat bank soal' })
  }
}

export async function create(req, res) {
  try {
    const { judul, deskripsi, file_pdf, total_soal, kunci_jawaban, acak } = req.body
    if (!judul || !file_pdf || !total_soal || !kunci_jawaban) {
      return res.status(400).json({ error: 'Judul, file PDF, total soal, dan kunci jawaban wajib diisi' })
    }
    const result = await BankSoalModel.createBankSoal({ judul, deskripsi, file_pdf, total_soal, kunci_jawaban, acak })
    res.status(201).json(result)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Gagal membuat bank soal' })
  }
}

export async function update(req, res) {
  try {
    const { judul, deskripsi, file_pdf, total_soal, kunci_jawaban, acak } = req.body
    if (!judul || !file_pdf || !total_soal || !kunci_jawaban) {
      return res.status(400).json({ error: 'Judul, file PDF, total soal, dan kunci jawaban wajib diisi' })
    }
    const result = await BankSoalModel.updateBankSoal(req.params.id, { judul, deskripsi, file_pdf, total_soal, kunci_jawaban, acak })
    if (!result) return res.status(404).json({ error: 'Bank soal tidak ditemukan' })
    res.json(result)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Gagal mengupdate bank soal' })
  }
}

export async function remove(req, res) {
  try {
    await BankSoalModel.deleteBankSoal(req.params.id)
    res.json({ success: true })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Gagal menghapus bank soal' })
  }
}
