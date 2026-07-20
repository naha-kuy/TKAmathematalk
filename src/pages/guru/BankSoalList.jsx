import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { bankSoal } from '../../lib/api'
import './BankSoalList.css'

export default function BankSoalList() {
  const navigate = useNavigate()
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchSoal = () => bankSoal.list().then(setList).catch(() => {}).finally(() => setLoading(false))
  useEffect(() => { fetchSoal() }, [])

  const handleDelete = async (id) => {
    if (!confirm('Hapus bank soal ini?')) return
    await bankSoal.remove(id)
    fetchSoal()
  }

  if (loading) return <div className="page-loader"><span className="loader" /><p>Memuat...</p></div>

  return (
    <div className="bank-soal-list">
      <header className="dashboard-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1>📝 Bank Soal</h1>
          <p>Kelola bank soal dan kunci jawaban.</p>
        </div>
        <button className="btn btn-primary" onClick={() => navigate('/guru/bank-soal/new')}>
          + Bank Soal Baru
        </button>
      </header>

      {list.length === 0 ? (
        <div className="empty-state"><p>Belum ada bank soal.</p></div>
      ) : (
        <div className="table-wrapper card" style={{ padding: 0 }}>
          <table>
            <thead>
              <tr>
                <th>Judul</th>
                <th>Soal</th>
                <th>Acak</th>
                <th>File PDF</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {list.map(s => (
                <tr key={s.id}>
                  <td><strong>{s.judul}</strong></td>
                  <td>{s.total_soal}</td>
                  <td>{s.acak ? '✅' : '❌'}</td>
                  <td>
                    <a href={s.file_pdf} target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-sm">
                      📥 Lihat
                    </a>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.35rem' }}>
                      <button className="btn btn-primary btn-sm" onClick={() => navigate(`/guru/bank-soal/${s.id}`)}>
                        Edit
                      </button>
                      <button className="btn btn-danger btn-sm" onClick={() => handleDelete(s.id)}>
                        Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
