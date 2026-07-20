import * as KelasModel from '../models/Kelas.js'

export async function list(req, res) {
  try {
    const kelas = await KelasModel.findAllKelas()
    res.json(kelas)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Gagal memuat kelas' })
  }
}

export async function create(req, res) {
  try {
    const { nama_kelas } = req.body
    if (!nama_kelas) return res.status(400).json({ error: 'Nama kelas wajib diisi' })
    const result = await KelasModel.createKelas(nama_kelas)
    res.status(201).json(result)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Gagal membuat kelas' })
  }
}

export async function remove(req, res) {
  try {
    await KelasModel.deleteKelas(req.params.id)
    res.json({ success: true })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Gagal menghapus kelas' })
  }
}
