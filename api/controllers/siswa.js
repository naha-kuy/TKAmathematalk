import * as UserModel from '../models/User.js'

export async function listPending(req, res) {
  try {
    const siswa = await UserModel.findPendingSiswa()
    res.json(siswa)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Gagal memuat data siswa' })
  }
}

export async function approve(req, res) {
  try {
    await UserModel.approveSiswa(req.params.id)
    res.json({ success: true })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Gagal menyetujui siswa' })
  }
}

export async function listAll(req, res) {
  try {
    const siswa = await UserModel.findAllSiswa()
    res.json(siswa)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Gagal memuat data siswa' })
  }
}

export async function getDetail(req, res) {
  try {
    const siswa = await UserModel.findSiswaById(req.params.id)
    if (!siswa) return res.status(404).json({ error: 'Siswa tidak ditemukan' })
    res.json(siswa)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Gagal memuat data siswa' })
  }
}

export async function remove(req, res) {
  try {
    await UserModel.deleteSiswa(req.params.id)
    res.json({ success: true })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Gagal menghapus siswa' })
  }
}
