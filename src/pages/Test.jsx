import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Test.css'

const cssVars = [
  { name: '--primary', value: '#217093' },
  { name: '--primary-dark', value: '#1a5a7a' },
  { name: '--primary-light', value: '#4eb8dd' },
  { name: '--primary-lighter', value: '#a9ddf3' },
  { name: '--primary-lightest', value: '#ddf1fa' },
  { name: '--bg', value: '#eff3f4' },
  { name: '--surface', value: '#ffffff' },
  { name: '--text', value: '#2c3e50' },
  { name: '--text-secondary', value: '#6c7a89' },
  { name: '--border', value: '#dce4e8' },
  { name: '--radius', value: '6px' },
  { name: '--input-bg', value: '#f9fbfc' },
  { name: '--table-hover-bg', value: '#f0f7fa' },
  { name: '--sidebar-gradient-start', value: '#1a5a7a' },
  { name: '--sidebar-gradient-end', value: '#217093' },
  { name: '--overlay', value: 'rgba(0,0,0,0.4)' },
  { name: '--shadow-lg', value: '0 20px 60px rgba(33,112,147,0.15)' },
  { name: '--alert-error-bg', value: '#fde8e8' },
  { name: '--alert-error-text', value: '#c0392b' },
  { name: '--alert-success-bg', value: '#e8f8f0' },
  { name: '--alert-success-text', value: '#27ae60' },
]

const dummySoal = [
  { no: 1, soal: '3 + 5 = ...', opsi: ['6', '7', '8', '9'], jawaban: 'C' },
  { no: 2, soal: '10 - 4 = ...', opsi: ['5', '6', '7', '8'], jawaban: 'B' },
  { no: 3, soal: '2 × 6 = ...', opsi: ['8', '10', '12', '14'], jawaban: 'C' },
]

export default function Test() {
  const [apiResult, setApiResult] = useState(null)
  const [apiLoading, setApiLoading] = useState(false)

  const testApi = async (endpoint) => {
    setApiLoading(true)
    setApiResult(null)
    try {
      const res = await fetch(endpoint)
      const data = await res.json()
      setApiResult({ ok: true, data })
    } catch (err) {
      setApiResult({ ok: false, error: err.message })
    } finally {
      setApiLoading(false)
    }
  }

  return (
    <div className="test-page">
      <h1>🧪 Halaman Test</h1>
      <p className="test-subtitle">TKA Mathematalk — Yeti Winter Theme Component Showcase</p>

      {/* Color Palette */}
      <section className="test-section">
        <h2>🎨 Color Palette</h2>
        <div className="color-grid">
          {cssVars.map(v => (
            <div key={v.name} className="color-swatch">
              <div className="color-box" style={{ background: `var(${v.name})` }} />
              <div className="color-info">
                <code>{v.name}</code>
                <span>{v.value}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Buttons */}
      <section className="test-section">
        <h2>🔘 Buttons</h2>
        <div className="test-row">
          <button className="btn btn-primary">Primary</button>
          <button className="btn btn-secondary">Secondary</button>
          <button className="btn btn-outline">Outline</button>
          <button className="btn btn-primary" disabled>Disabled</button>
          <button className="btn btn-outline" disabled>Disabled</button>
        </div>
      </section>

      {/* Forms */}
      <section className="test-section">
        <h2>📝 Form Elements</h2>
        <div className="test-form-grid">
          <div className="form-group">
            <label>Text Input</label>
            <input type="text" placeholder="Nama lengkap" defaultValue="Contoh" />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" placeholder="Password" defaultValue="rahasia" />
          </div>
          <div className="form-group">
            <label>Select</label>
            <select>
              <option>Pilih kelas</option>
              <option>Kelas A</option>
              <option>Kelas B</option>
            </select>
          </div>
          <div className="form-group">
            <label>With Error</label>
            <input type="text" className="input-error" placeholder="Error state" />
            <small className="field-error">Field ini wajib diisi</small>
          </div>
        </div>
      </section>

      {/* Alerts */}
      <section className="test-section">
        <h2>⚠️ Alerts</h2>
        <div className="test-row-col">
          <div className="form-error">Ini adalah error message</div>
          <div className="form-success">Ini adalah success message</div>
        </div>
      </section>

      {/* Table */}
      <section className="test-section">
        <h2>📊 Table Preview</h2>
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>No</th>
                <th>Nama</th>
                <th>Kelas</th>
                <th>Nilai</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Budi Santoso</td>
                <td>Kelas A</td>
                <td>85</td>
                <td><span className="badge badge-success">Lulus</span></td>
              </tr>
              <tr>
                <td>2</td>
                <td>Siti Nurhaliza</td>
                <td>Kelas B</td>
                <td>92</td>
                <td><span className="badge badge-success">Lulus</span></td>
              </tr>
              <tr>
                <td>3</td>
                <td>Doni Prasetyo</td>
                <td>Kelas A</td>
                <td>45</td>
                <td><span className="badge badge-error">Remidi</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Soal Preview */}
      <section className="test-section">
        <h2>📝 Soal Pilihan Ganda Preview</h2>
        {dummySoal.map(q => (
          <div key={q.no} className="soal-card">
            <p className="soal-text"><strong>{q.no}.</strong> {q.soal}</p>
            <div className="soal-opsi">
              {['A', 'B', 'C', 'D'].map((huruf, i) => (
                <label key={huruf} className={`soal-option ${huruf === q.jawaban ? 'correct' : ''}`}>
                  <input type="radio" name={`q${q.no}`} value={huruf} />
                  <span>{huruf}. {q.opsi[i]}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
        <p className="test-note">* Opsi dengan jawaban benar diberi highlight hijau (C, B, C)</p>
      </section>

      {/* Sidebar Preview */}
      <section className="test-section">
        <h2>🧭 Sidebar Navigation (Preview)</h2>
        <div className="sidebar-demo">
          <div className="sidebar-demo-guru">
            <h4>Guru Sidebar</h4>
            <nav>
              <Link to="/guru/dashboard" className="demo-link">📊 Dashboard</Link>
              <Link to="/guru/kelas" className="demo-link">👥 Kelola Kelas</Link>
              <Link to="/guru/bank-soal" className="demo-link">📚 Bank Soal</Link>
              <Link to="/guru/siswa" className="demo-link">👤 Siswa</Link>
              <Link to="/guru/leaderboard" className="demo-link">🏆 Leaderboard</Link>
            </nav>
          </div>
          <div className="sidebar-demo-siswa">
            <h4>Siswa Sidebar</h4>
            <nav>
              <Link to="/siswa/dashboard" className="demo-link">📊 Dashboard</Link>
              <Link to="/siswa/history" className="demo-link">📖 History</Link>
              <Link to="/siswa/leaderboard" className="demo-link">🏆 Leaderboard</Link>
            </nav>
          </div>
        </div>
      </section>

      {/* API Test */}
      <section className="test-section">
        <h2>🔌 API Connection Test</h2>
        <div className="test-row">
          <button className="btn btn-outline" onClick={() => testApi('/api/kelas')} disabled={apiLoading}>
            {apiLoading ? 'Loading...' : 'Test GET /api/kelas'}
          </button>
          <button className="btn btn-outline" onClick={() => testApi('/api/leaderboard')} disabled={apiLoading}>
            Test GET /api/leaderboard
          </button>
        </div>
        {apiResult && (
          <pre className={`api-result ${apiResult.ok ? 'ok' : 'error'}`}>
            {JSON.stringify(apiResult.data ?? apiResult.error, null, 2)}
          </pre>
        )}
      </section>

      {/* Loading State */}
      <section className="test-section">
        <h2>⏳ Loading / PageLoader</h2>
        <div className="loader-demo">
          <div className="page-loader-inline" />
          <span>Loading indicator (CSS spinner)</span>
        </div>
      </section>

      <div className="test-footer">
        <Link to="/login" className="btn btn-primary">Go to Login</Link>
        <Link to="/signup" className="btn btn-outline">Go to Signup</Link>
      </div>
    </div>
  )
}
