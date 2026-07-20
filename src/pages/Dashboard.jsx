import { useNavigate } from 'react-router-dom'
import './Dashboard.css'

export default function Dashboard() {
  const navigate = useNavigate()

  return (
    <div className="dashboard">
      <aside className="dashboard-sidebar">
        <h2>TKA Mathematalk</h2>
        <nav>
          <button className="active">Beranda</button>
          <button>Belajar</button>
          <button>Nilai</button>
          <button onClick={() => navigate('/login')}>Logout</button>
        </nav>
      </aside>
      <main className="dashboard-main">
        <header>
          <h1>Selamat Datang!</h1>
          <p>Dashboard kamu akan segera hadir.</p>
        </header>
      </main>
    </div>
  )
}
