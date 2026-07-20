import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import './SiswaLayout.css'

const links = [
  { to: '/siswa/dashboard', label: 'Dashboard', icon: '📊' },
  { to: '/siswa/leaderboard', label: 'Leaderboard', icon: '🏆' },
  { to: '/siswa/history', label: 'Riwayat', icon: '📋' },
]

export default function SiswaLayout() {
  const { logout, user } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="layout">
      <aside className="sidebar siswa-sidebar">
        <div className="sidebar-brand" onClick={() => navigate('/siswa/dashboard')}>
          <span className="brand-icon">❄️</span>
          <div className="brand-text">
            <strong>TKA Mathematalk</strong>
            <small>Halo, {user?.nama_panggilan}</small>
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
