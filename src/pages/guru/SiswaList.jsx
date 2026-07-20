import { useState, useEffect } from 'react'
import { siswa } from '../../lib/api'
import './SiswaList.css'

export default function SiswaList() {
  const [list, setList] = useState([])
  const [pending, setPending] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchData = () => {
    Promise.all([
      siswa.list().catch(() => []),
      siswa.pending().catch(() => [])
    ]).then(([all, p]) => {
      setList(all)
      setPending(p)
    }).finally(() => setLoading(false))
  }

  useEffect(() => { fetchData() }, [])

  const handleApprove = async (id) => {
    await siswa.approve(id)
    fetchData()
  }

  const handleRemove = async (id) => {
    if (!confirm('Hapus siswa ini?')) return
    await siswa.remove(id)
    fetchData()
  }

  if (loading) return <div className="page-loader"><span className="loader" /><p>Memuat...</p></div>

  return (
    <div className="siswa-list-page">
      <header className="dashboard-header">
        <h1>👥 Data Siswa</h1>
        <p>{pending.length} siswa menunggu persetujuan.</p>
      </header>

      {pending.length > 0 && (
        <section className="pending-section">
          <h2>Menunggu Persetujuan</h2>
          <div className="table-wrapper card" style={{ padding: 0 }}>
            <table>
              <thead>
                <tr>
                  <th>Nama Lengkap</th>
                  <th>Panggilan</th>
                  <th>Password</th>
                  <th>Kelas</th>
                  <th>Sekolah</th>
                  <th>No. Orang Tua</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {pending.map(s => (
                  <tr key={s.id}>
                    <td>{s.nama_lengkap}</td>
                    <td>{s.nama_panggilan}</td>
                    <td><code>{s.password}</code></td>
                    <td>{s.nama_kelas || '-'}</td>
                    <td>{s.nama_sekolah}</td>
                    <td>{s.nomor_ortu}</td>
                    <td>
                      <button className="btn btn-primary btn-sm" onClick={() => handleApprove(s.id)}>Setujui</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      <section className="all-siswa-section" style={{ marginTop: '2rem' }}>
        <h2>Semua Siswa</h2>
        <div className="table-wrapper card" style={{ padding: 0, marginTop: '0.75rem' }}>
          <table>
            <thead>
              <tr>
                <th>Nama Lengkap</th>
                <th>Panggilan</th>
                <th>Password</th>
                <th>Kelas</th>
                <th>Sekolah</th>
                <th>Status</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {list.map(s => (
                <tr key={s.id}>
                  <td>{s.nama_lengkap}</td>
                  <td>{s.nama_panggilan}</td>
                  <td><code>{s.password}</code></td>
                  <td>{s.nama_kelas || '-'}</td>
                  <td>{s.nama_sekolah}</td>
                  <td>
                    <span className={`badge ${s.approved ? 'badge-success' : 'badge-warning'}`}>
                      {s.approved ? 'Disetujui' : 'Pending'}
                    </span>
                  </td>
                  <td>
                    <button className="btn btn-danger btn-sm" onClick={() => handleRemove(s.id)}>Hapus</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
