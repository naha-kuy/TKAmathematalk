import { useState, useEffect } from 'react'
import { siswa, bankSoal, submission } from '../../lib/api'
import './Dashboard.css'

export default function GuruDashboard() {
  const [stats, setStats] = useState({ siswa: 0, pending: 0, soal: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      siswa.list().catch(() => []),
      siswa.pending().catch(() => []),
      bankSoal.list().catch(() => [])
    ]).then(([allSiswa, pendingSiswa, soal]) => {
      setStats({
        siswa: allSiswa.length,
        pending: pendingSiswa.length,
        soal: soal.length
      })
    }).finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="page-loader"><span className="loader" /><p>Memuat...</p></div>

  return (
    <div className="guru-dashboard">
      <header className="dashboard-header">
        <h1>Dashboard Guru</h1>
        <p>Selamat datang, NafYu! Kelola bank soal dan siswa di sini.</p>
      </header>

      <div className="stats-grid">
        <div className="stat-card card">
          <div className="stat-value">{stats.siswa}</div>
          <div className="stat-label">Total Siswa</div>
        </div>
        <div className="stat-card card">
          <div className="stat-value" style={stats.pending > 0 ? { color: 'var(--warning)' } : {}}>{stats.pending}</div>
          <div className="stat-label">Menunggu Persetujuan</div>
        </div>
        <div className="stat-card card">
          <div className="stat-value">{stats.soal}</div>
          <div className="stat-label">Bank Soal</div>
        </div>
      </div>
    </div>
  )
}
