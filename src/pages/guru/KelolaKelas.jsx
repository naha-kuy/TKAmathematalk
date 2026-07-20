import { useState, useEffect } from 'react'
import { kelas } from '../../lib/api'
import './KelolaKelas.css'

export default function KelolaKelas() {
  const [list, setList] = useState([])
  const [nama, setNama] = useState('')
  const [loading, setLoading] = useState(true)

  const fetchKelas = () => kelas.list().then(setList).catch(() => {}).finally(() => setLoading(false))
  useEffect(() => { fetchKelas() }, [])

  const handleAdd = async (e) => {
    e.preventDefault()
    if (!nama.trim()) return
    await kelas.create(nama.trim())
    setNama('')
    fetchKelas()
  }

  const handleDelete = async (id) => {
    if (!confirm('Hapus kelas ini?')) return
    await kelas.remove(id)
    fetchKelas()
  }

  if (loading) return <div className="page-loader"><span className="loader" /><p>Memuat...</p></div>

  return (
    <div className="kelola-kelas">
      <header className="dashboard-header">
        <h1>📚 Kelola Kelas</h1>
        <p>Tambah atau hapus kelas untuk siswa.</p>
      </header>

      <form className="add-kelas-form" onSubmit={handleAdd}>
        <input value={nama} onChange={e => setNama(e.target.value)} placeholder="Nama kelas baru..." />
        <button type="submit" className="btn btn-primary">Tambah</button>
      </form>

      {list.length === 0 ? (
        <div className="empty-state"><p>Belum ada kelas.</p></div>
      ) : (
        <div className="table-wrapper card" style={{ padding: 0, marginTop: '1rem' }}>
          <table>
            <thead>
              <tr>
                <th>Nama Kelas</th>
                <th>Dibuat</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {list.map(k => (
                <tr key={k.id}>
                  <td><strong>{k.nama_kelas}</strong></td>
                  <td>{new Date(k.created_at).toLocaleDateString('id-ID')}</td>
                  <td><button className="btn btn-danger btn-sm" onClick={() => handleDelete(k.id)}>Hapus</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
