import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import './GuruLayout.css'

const links = [
  { to: '/guru/dashboard', label: 'Dashboard', icon: '📊' },
  { to: '/guru/kelas', label: 'Kelas', icon: '📚' },
  { to: '/guru/bank-soal', label: 'Bank Soal', icon: '📝' },
  { to: '/guru/siswa', label: 'Siswa', icon: '👥' },
  { to: '/guru/leaderboard', label: 'Leaderboard', icon: '🏆' },
]

export default function GuruLayout() {
  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="layout">
      <aside className="sidebar guru-sidebar">
        <div className="sidebar-brand" onClick={() => navigate('/guru/dashboard')}>
          <span className="brand-icon">❄️</span>
          <div className="brand-text">
            <strong>TKA Mathematalk</strong>
            <small>Guru</small>
          </div>
        </div>
        <nav className="sidebar-nav">
          {links.map(link => (
            <NavLink key={link.to} to={link.to} className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
              <span className="nav-icon">{link.icon}</span>
              <span>{link.label}</span>
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-footer">
          <button className="nav-item logout-btn" onClick={handleLogout}>
            <span className="nav-icon">🚪</span>
            <span>Logout</span>
          </button>
        </div>
      </aside>
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  )
}
