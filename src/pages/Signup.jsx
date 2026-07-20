import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth, kelas as kelasApi } from '../lib/api'
import './Signup.css'

function EyeOpen() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  )
}

function EyeClosed() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
      <line x1="1" y1="1" x2="23" y2="23"/>
      <path d="M14.12 14.12a3 3 0 1 1-4.24-4.24"/>
    </svg>
  )
}

export default function Signup() {
  const navigate = useNavigate()
  const [kelasList, setKelasList] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(null)
  const [showPassword, setShowPassword] = useState(false)
  const [form, setForm] = useState({
    nama_lengkap: '', nama_panggilan: '', password: '',
    nomor_ortu: '', kelas_id: '', nama_sekolah: ''
  })

  useEffect(() => {
    kelasApi.list().then(setKelasList).catch(() => {})
  }, [])

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!form.nama_lengkap || !form.nama_panggilan || !form.password || !form.nomor_ortu || !form.kelas_id || !form.nama_sekolah) {
      setError('Semua field wajib diisi')
      return
    }
    setLoading(true)
    try {
      const res = await auth.signup(form)
      setSuccess({ nama: form.nama_panggilan, kelas: res.kelas_nama })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="signup-page">
        <div className="signup-card">
          <div className="signup-success-icon">✅</div>
          <h2>Pendaftaran Berhasil!</h2>
          <p>Halo <strong>{success.nama}</strong>, akun kamu telah terdaftar.</p>
          <p className="signup-wa-info">
            Silakan hubungi guru melalui WhatsApp untuk konfirmasi akun kamu.
          </p>
          <a href="https://wa.me/6282334157792" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
            Chat WA ke 082334157792
          </a>
          <button className="btn btn-outline" onClick={() => navigate('/login')} style={{ marginTop: '1rem' }}>
            Kembali ke Login
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="signup-page">
      <div className="signup-card">
        <div className="signup-header">
          <span className="brand-icon">❄️</span>
          <h2>Daftar Siswa</h2>
          <p>TKA Mathematalk</p>
        </div>

        <form onSubmit={handleSubmit}>
          {error && <div className="form-error">{error}</div>}

          <div className="form-group">
            <label>Nama Lengkap</label>
            <input name="nama_lengkap" value={form.nama_lengkap} onChange={handleChange} placeholder="Nama lengkap" />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Nama Panggilan</label>
              <input name="nama_panggilan" value={form.nama_panggilan} onChange={handleChange} placeholder="Untuk login" />
            </div>
            <div className="form-group">
              <label>Password</label>
              <div className="signup-pwd-wrapper">
                <input name="password" type={showPassword ? 'text' : 'password'} value={form.password} onChange={handleChange} placeholder="Masukkan Password Disini" />
                <button type="button" className="signup-pwd-toggle" tabIndex={-1} onClick={() => setShowPassword(p => !p)}>
                  {showPassword ? <EyeOpen /> : <EyeClosed />}
                </button>
              </div>
            </div>
          </div>

          <div className="form-group">
            <label>Nomor Orang Tua (WA)</label>
            <input name="nomor_ortu" value={form.nomor_ortu} onChange={handleChange} placeholder="08xxxxxxxxxx" />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Kelas</label>
              <select name="kelas_id" value={form.kelas_id} onChange={handleChange}>
                <option value="">Pilih kelas</option>
                {kelasList.map(k => <option key={k.id} value={k.id}>{k.nama_kelas}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>Sekolah</label>
              <input name="nama_sekolah" value={form.nama_sekolah} onChange={handleChange} placeholder="Nama sekolah" />
            </div>
          </div>

          <button type="submit" className="btn btn-primary signup-submit" disabled={loading}>
            {loading ? 'Mendaftar...' : 'Daftar'}
          </button>
        </form>

        <p className="signup-footer">
          Sudah punya akun? <a href="/login" onClick={e => { e.preventDefault(); navigate('/login') }}>Login</a>
        </p>
      </div>
    </div>
  )
}
