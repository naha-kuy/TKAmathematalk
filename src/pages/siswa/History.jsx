import { useState, useEffect } from 'react'
import { submission } from '../../lib/api'
import './History.css'

export default function History() {
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    submission.history()
      .then(setHistory)
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="page-loader"><span className="loader" /><p>Memuat...</p></div>

  // Group by bank_soal_id
  const grouped = {}
  history.forEach(h => {
    if (!grouped[h.bank_soal_id]) grouped[h.bank_soal_id] = []
    grouped[h.bank_soal_id].push(h)
  })

  return (
    <div className="history-page">
      <header className="dashboard-header">
        <h1>Riwayat Pengerjaan</h1>
        <p>Lihat nilai terakhir dan riwayat pengerjaan kamu.</p>
      </header>

      {Object.keys(grouped).length === 0 ? (
        <div className="empty-state">
          <p>Belum ada riwayat pengerjaan.</p>
        </div>
      ) : (
        Object.entries(grouped).map(([bankSoalId, submissions]) => {
          const sorted = submissions.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
          const last = sorted[0]
          return (
            <div key={bankSoalId} className="history-group card">
              <h3>{last.judul} <span className="badge badge-success">Terakhir: {last.nilai}</span></h3>
              <table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Tanggal</th>
                    <th>Nilai</th>
                  </tr>
                </thead>
                <tbody>
                  {sorted.map((s, i) => (
                    <tr key={s.id}>
                      <td>{i + 1}</td>
                      <td>{new Date(s.created_at).toLocaleDateString('id-ID', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</td>
                      <td><span className={`badge ${s.nilai >= 70 ? 'badge-success' : 'badge-warning'}`}>{s.nilai}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        })
      )}
    </div>
  )
}
