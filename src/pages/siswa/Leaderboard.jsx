import { useState, useEffect } from 'react'
import { leaderboard as lbApi } from '../../lib/api'
import { useAuth } from '../../contexts/AuthContext'
import './Leaderboard.css'

export default function SiswaLeaderboard() {
  const { user } = useAuth()
  const [data, setData] = useState([])
  const [filter, setFilter] = useState('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    lbApi.get(filter === 'my' ? user.kelas_id : null)
      .then(setData)
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [filter, user.kelas_id])

  if (loading) return <div className="page-loader"><span className="loader" /><p>Memuat...</p></div>

  return (
    <div className="lb-page">
      <header className="dashboard-header">
        <h1>🏆 Leaderboard</h1>
        <p>Peringkat siswa berdasarkan total skor.</p>
      </header>

      <div className="lb-filters">
        <button className={`btn btn-sm ${filter === 'all' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setFilter('all')}>
          Lintas Kelas
        </button>
        <button className={`btn btn-sm ${filter === 'my' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setFilter('my')}>
          Kelas Saya
        </button>
      </div>

      {data.length === 0 ? (
        <div className="empty-state"><p>Belum ada data leaderboard.</p></div>
      ) : (
        <div className="table-wrapper card" style={{ padding: 0 }}>
          <table>
            <thead>
              <tr>
                <th>Peringkat</th>
                <th>Nama</th>
                <th>Kelas</th>
                <th>Total Skor</th>
                <th>Soal Dikerjakan</th>
              </tr>
            </thead>
            <tbody>
              {data.map((siswa, i) => (
                <tr key={siswa.id} className={siswa.id === user.id ? 'highlight-row' : ''}>
                  <td>
                    {i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `#${i + 1}`}
                  </td>
                  <td><strong>{siswa.nama_panggilan}</strong></td>
                  <td>{siswa.nama_kelas || '-'}</td>
                  <td><span className="badge badge-success">{siswa.total_skor}</span></td>
                  <td>{siswa.total_soal}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
