import * as UserModel from '../models/User.js'
import * as KelasModel from '../models/Kelas.js'
import { generateToken } from '../middleware/auth.js'

export async function login(req, res) {
  try {
    const { username, password } = req.body
    if (!username || !password) {
      return res.status(400).json({ error: 'Username dan password wajib diisi' })
    }

    if (username === 'NafYu' && password === 'qeadzc') {
      const token = generateToken({ id: 1, username: 'NafYu' }, 'guru')
      return res.json({ token, role: 'guru', user: { id: 1, nama: 'NafYu' } })
    }

    const siswa = await UserModel.findSiswaByNama(username)
    if (!siswa || siswa.password !== password) {
      return res.status(401).json({ error: 'Username atau password salah' })
    }

    const token = generateToken({ id: siswa.id }, 'siswa')
    res.json({
      token, role: 'siswa',
      user: {
        id: siswa.id, nama_lengkap: siswa.nama_lengkap,
        nama_panggilan: siswa.nama_panggilan, approved: siswa.approved,
        kelas_id: siswa.kelas_id
      }
    })
  } catch (err) {
    console.error('Login error:', err)
    res.status(500).json({ error: 'Terjadi kesalahan server' })
  }
}

export async function signup(req, res) {
  try {
    const { nama_lengkap, nama_panggilan, password, nomor_ortu, kelas_id, nama_sekolah } = req.body
    if (!nama_lengkap || !nama_panggilan || !password || !nomor_ortu || !kelas_id || !nama_sekolah) {
      return res.status(400).json({ error: 'Semua field wajib diisi' })
    }

    const existing = await UserModel.findSiswaByNama(nama_panggilan)
    if (existing) {
      return res.status(409).json({ error: 'Nama panggilan atau nama lengkap sudah digunakan' })
    }

    const result = await UserModel.createSiswa({ nama_lengkap, nama_panggilan, password, nomor_ortu, kelas_id, nama_sekolah })
    const kelas = await KelasModel.findAllKelas()
    const kelasNama = kelas.find(k => k.id === Number(kelas_id))?.nama_kelas || ''
    res.status(201).json({ id: result.id, kelas_nama: kelasNama })
  } catch (err) {
    console.error('Signup error:', err)
    res.status(500).json({ error: 'Terjadi kesalahan server' })
  }
}

export async function me(req, res) {
  try {
    if (req.user.role === 'guru') {
      return res.json({ role: 'guru', user: { id: 1, nama: 'NafYu' } })
    }
    const siswa = await UserModel.findSiswaById(req.user.id)
    if (!siswa) return res.status(404).json({ error: 'User tidak ditemukan' })
    res.json({
      role: 'siswa',
      user: {
        id: siswa.id, nama_lengkap: siswa.nama_lengkap,
        nama_panggilan: siswa.nama_panggilan, approved: siswa.approved,
        kelas_id: siswa.kelas_id, nama_kelas: siswa.nama_kelas
      }
    })
  } catch (err) {
    console.error('Me error:', err)
    res.status(500).json({ error: 'Terjadi kesalahan server' })
  }
}
