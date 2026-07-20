import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { bankSoal, submission } from '../../lib/api'
import { useAuth } from '../../contexts/AuthContext'
import './Dashboard.css'

export default function SiswaDashboard() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [soalList, setSoalList] = useState([])
  const [scores, setScores] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      bankSoal.list(),
      submission.history()
    ]).then(([soal, hist]) => {
      setSoalList(soal)
      const last = {}
      hist.forEach(h => {
        if (!last[h.bank_soal_id] || new Date(h.created_at) > new Date(last[h.bank_soal_id].created_at)) {
          last[h.bank_soal_id] = h
        }
      })
      setScores(last)
    }).catch(() => {}).finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="page-loader"><span className="loader" /><p>Memuat...</p></div>

  return (
    <div className="siswa-dashboard">
      <header className="dashboard-header">
        <h1>Halo, {user?.nama_panggilan}! 👋</h1>
        <p>Selamat datang di TKA Mathematalk. Pilih bank soal untuk dikerjakan.</p>
      </header>

      <div className="soal-grid">
        {soalList.map(soal => {
          const myScore = scores[soal.id]
          return (
            <div key={soal.id} className="soal-card">
              <div className="soal-card-body">
                <h3>{soal.judul}</h3>
                <p>{soal.deskripsi || 'Tidak ada deskripsi'}</p>
                <div className="soal-meta">
                  <span>{soal.total_soal} soal</span>
                  {myScore && <span className={`badge ${myScore.nilai >= 70 ? 'badge-success' : 'badge-warning'}`}>Nilai: {myScore.nilai}</span>}
                </div>
              </div>
              <div className="soal-card-actions">
                <a href={soal.file_pdf} target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-sm" download>
                  📥 Download PDF
                </a>
                <button className="btn btn-primary btn-sm" onClick={() => navigate(`/siswa/soal/${soal.id}`)}>
                  ✏️ Kerjakan
                </button>
              </div>
            </div>
          )
        })}
        {soalList.length === 0 && (
          <div className="empty-state">
            <p>Belum ada bank soal tersedia.</p>
          </div>
        )}
      </div>
    </div>
  )
}
