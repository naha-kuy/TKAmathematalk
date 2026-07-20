import { useState, useEffect } from 'react'
import { leaderboard as lbApi, kelas } from '../../lib/api'
import './Leaderboard.css'

export default function GuruLeaderboard() {
  const [data, setData] = useState([])
  const [kelasList, setKelasList] = useState([])
  const [filter, setFilter] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    kelas.list().then(setKelasList).catch(() => {})
  }, [])

  useEffect(() => {
    setLoading(true)
    lbApi.get(filter || null)
      .then(setData)
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [filter])

  if (loading) return <div className="page-loader"><span className="loader" /><p>Memuat...</p></div>

  return (
    <div className="lb-page">
      <header className="dashboard-header">
        <h1>🏆 Leaderboard Global</h1>
        <p>Peringkat siswa berdasarkan total skor.</p>
      </header>

      <div className="lb-filters">
        <button className={`btn btn-sm ${!filter ? 'btn-primary' : 'btn-outline'}`} onClick={() => setFilter('')}>
          Semua Kelas
        </button>
        {kelasList.map(k => (
          <button key={k.id} className={`btn btn-sm ${filter === String(k.id) ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setFilter(String(k.id))}>
            {k.nama_kelas}
          </button>
        ))}
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
                <tr key={siswa.id}>
                  <td>{i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `#${i + 1}`}</td>
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
